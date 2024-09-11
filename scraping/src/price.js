import https from 'https';
import fs from 'fs';
import zlib from 'zlib';

const getPrices = (async (store, url, category) => {
    await new Promise(async (resolve, reject) => {
        https.get(url, res => {
            let data = [];

            const gunzip = zlib.createGunzip();

            res.pipe(gunzip);

            gunzip.on('data', chunk => {
                data.push(chunk);
            });

            gunzip.on('end', () => {
                try {
                    const result = JSON.parse(Buffer.concat(data).toString());
                    let fruitData = result.filter(item => item.category === category);
                    
                    //let fruits = {};

                    // fruitData.forEach(data => {
                    //     fruits[data.name] = data.priceHistory.map(price => price.price);
                    // });

                    let fruits = [];

                    fruitData.forEach(data => {
                        fruits.push(
                            {
                                "name": data.name,
                                "price_history": data.priceHistory
                            }
                        );
                    });

                    fs.writeFileSync(`./price_assets/${store}_prices.json`, JSON.stringify(fruits, null, 2));
                    resolve();
                } catch (error) {
                    console.error("error: ", error);
                }
            });
        }).on('error', error => {
            reject(error);
        }); 
    });
});

const maxMinDifference = (store) => {
    const file = fs.readFileSync(`./price_assets/${store}_prices.json`);
    const data = JSON.parse(file);

    let percentages = {};
    //console.log(4.3/4.5);

    for(let product in data) {
        // const min = Math.min(...data[product]);
        // const max = Math.max(...data[product]);

        let prices = [];
        let lowPrices = [];
        for(let i = 1; i < data[product].length; i++) {
            if(data[product][i] < data[product][i-1]) {
                prices.push(100 - (data[product][i] / data[product][i-1] * 100));
                lowPrices.push(data[product][i]);
            }
        }
        if(prices.length > 1) {
            const biggestDrop = Math.max(...prices);
            const priceOfBD = lowPrices[prices.indexOf(biggestDrop)];
            percentages[product] = [biggestDrop, priceOfBD, Math.min(...data[product])];
        }
        //percentages[product] = min/max * 100;
    }

    fs.writeFileSync(`./price_assets/${store}_price_percentages.json`, JSON.stringify(percentages, null, 2));
}

await getPrices('coles', 'https://hotprices.org/data/latest-canonical.coles.compressed.json.gz', "003");
await getPrices('woolworths', 'https://hotprices.org/data/latest-canonical.woolies.compressed.json.gz', '000');
//maxMinDifference('coles');
//maxMinDifference('woolworths');