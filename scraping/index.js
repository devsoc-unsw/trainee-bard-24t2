import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

const colesUrl = 'https://www.coles.com.au/browse/fruit-vegetables/fruit';
const woolUrl = 'https://www.woolworths.com.au/shop/browse/fruit-veg/fruit/';

puppeteer.use(StealthPlugin());

const cmain = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
       });
    await page.setJavaScriptEnabled(true);
    await page.setViewport({ width: 1280, height: 800 });
          
    await page.goto(url);

    const products = await page.evaluate(() => {
        const pageNavigator = document.querySelectorAll('.coles-targeting-PaginationPaginationUl');
        console.log(pageNavigator.length);

        const productElements = document.querySelectorAll('.sc-6be317b8-7');
        return Array.from(productElements).map((product) => {
            return product.querySelector('.product__title').innerHTML;
        });
    });
    console.log(products);

    // await page.screenshot( {path: 'screenshot.png' });
    // const html = await page.evaluate(() => {
    //     return document.body.innerHTML;
    // });
    // console.log(html);

    await browser.close();
}

const wmain = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en'
       });
    await page.setJavaScriptEnabled(true);
    await page.setViewport({ width: 1280, height: 800 });
          
    await page.goto(url);
    await page.waitForSelector('wc-product-tile');

    let products = [];
    let nextPage;

    do {
        const currentItems = await page.evaluate(() => {
            const productElements = document.querySelectorAll('.ng-star-inserted');
            return Array.from(productElements).filter((product) => {
                const parent = product.parentElement;
                const hasParent = parent && parent.classList.contains('product-grid-v2--tile')

                const grandparent = parent.parentElement;
                const hasGrandParent = grandparent && grandparent.classList.contains('product-grid-v2--tile');

                const greatGrandparent = grandparent.parentElement;
                const hasGreatGrandparent = greatGrandparent && greatGrandparent.classList.contains('product-grid-v2--tile');

                // the html tags are inconsistent sometimes idk
                return (hasParent || hasGrandParent || hasGreatGrandparent) && product.shadowRoot;                
            }).map((product) => {
                const anchor = product.shadowRoot.querySelector('.title a');
                const slashSplit = anchor.href.split("/");
                return {
                    id: Number(slashSplit[slashSplit.length-2]),
                    name: anchor.innerHTML.split("-->")[1]?.trim() || 'unnamed item',
                    url: anchor.href
                };
            });
        });

        products = products.concat(currentItems);

        nextPage = await page.evaluate(() => {
            const nextButton = document.querySelector('.paging-next');
            if(nextButton) {
                return nextButton.href;
            }
            return null;
        });

        if (nextPage) {
            await page.goto(nextPage);
            await page.waitForSelector('wc-product-tile');
        }
    } while (nextPage)

    console.log(products.length, 'items saved');

    fs.writeFileSync('woolworths_fruits.json', JSON.stringify(products, null, 2));

    await browser.close();
}

const parse = (fileName) => {
    let fileContent = fs.readFileSync(fileName);
    let fruits = JSON.parse(fileContent);

    const cleaned = fruits.filter((fruit) => 
        !fruit.name.includes('Juice') && 
        !(fruit.name.includes('Fruit') && !fruit.name.includes('Kiwi')) 
        && !fruit.name.includes('Platter')
        && !fruit.name.includes('Mix')
        && !fruit.name.includes('Chocolate')
        && !fruit.name.includes('Cut'))
        .map((fruit) => {
            const ogName = fruit.name;
            let newName = ogName;

            const number = ogName.match(/\d/);
            if(number && (number.index > 0 && ogName[(number.index-1)] == " ")) {
                newName = ogName.slice(0, number.index);
            }

            // remove words ending with g
            const regex = new RegExp(`\\b\\w*g\\b`, 'gi');
            newName = newName.replace(regex, "").replace(/\s+/g, " ").trim();

            newName = newName.replace("Woolworths", "").trim();
            newName = newName.replace("Each", "").trim();
            newName = newName.replace("Punnet", "").trim();
            newName = newName.replace("Fresh", "").trim();
            newName = newName.replace("Food", "").trim();
            newName = newName.replace("Prepacked", "").trim();
            newName = newName.replace("Quarter", "").trim();
            newName = newName.replace("Half", "").trim();
            newName = newName.replace("Whole", "").trim();
            newName = newName.replace("Large", "").trim();
            newName = newName.replace("Good To Go", "").trim();

            if(newName.includes("Kids") && !newName.includes("Mini")) {
                newName = newName.replace("Kids", "Mini").trim();
            } else {
                newName = newName.replace("Kids", "").trim();
            }

            fruit.name = newName;

            return fruit;

            //console.log(`old name: ${ogName}, new name: ${newName}`);
        });

        //checking for common words
        let keyWords = {};
        
        cleaned.forEach((fruit) => {
            const words = fruit.name.split(" ");

            for(let i = 1; i <= words.length; i++) {
                const cur = words.slice(0, i).join(" ");
                if(!(cur in keyWords)) {
                    keyWords[cur] = 0;
                }
                keyWords[cur]++;
            }

            for(let i = 1; i < words.length; i++) {
                const cur = words.slice(i, words.length).join(" ");
                if(!(cur in keyWords)) {
                    keyWords[cur] = 0;
                }
                keyWords[cur]++;
            }
        });

        keyWords = Object.fromEntries(
            Object.entries(keyWords).filter(([key, value]) => {value > 1})
        );

        // keyWords = Object.fromEntries(
        //     Object.entries(keyWords).filter(([key, value]) => {
        //         const filtered = Object.keys(keyWords).filter(word => word != key && word.includes(key) && keyWords[word] == value);
        //         return filtered.length > 0;
        //     })
        // );
        console.log(keyWords);
}


//cmain(colesUrl);
//wmain(woolUrl);
parse('woolworths_fruits.json');