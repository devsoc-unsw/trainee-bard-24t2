import https from 'https';
import dotenv from 'dotenv';
import { resolve } from 'path';
import fs from 'fs';
import zlib from 'zlib';

const envPath = resolve('../../backend/.env');
dotenv.config({ path: envPath });

const nameFilter = (name) => {
    let newName = name;

    // remove numbers
    const number = name.match(/\d/);
    if(number && (number.index > 0 && name[(number.index-1)] == " ")) {
        newName = name.slice(0, number.index);
    }

    // remove words ending with g
    const regex = new RegExp(`\\b\\w*g\\b`, 'gi');
    newName = newName.replace(regex, "").replace(/\s+/g, " ").trim();

    // hard coding filters for some other common prefixes
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
    newName = newName.replace("Eat Later", "").trim();

    // sometimes "Kids" and "Mini" are both included in the name, but sometimes "Mini" is absent
    if(newName.includes("Kids") && !newName.includes("Mini")) {
        newName = newName.replace("Kids", "Mini").trim();
    } else {
        newName = newName.replace("Kids", "").trim();
    }

    return newName;
}

 /**
  * Attempting to narrow down and identify common fruit names from the Woolworths fruit selections 
  * @param {fileName} - the file name with the (Woolworths) fruit JSON data
  */
const parse = (fileName) => {
    let fileContent = fs.readFileSync(`./assets/${fileName}`);
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
            let newName = nameFilter(ogName);

            fruit.name = newName;

            return fruit;
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
            Object.entries(keyWords).filter(([key, value]) => value > 1 || key.split(" ").length == 1)
        );

        keyWords = Object.fromEntries(
            Object.entries(keyWords).filter(([key, value]) => {
                const filtered = Object.keys(keyWords).filter(word => word != key && word.includes(key) && keyWords[word] == value);
                return filtered.length == 0;
            })
        );
        
        let fruitNames = [];
        let filtered = [];

        async function checkFruit(keyWords) {
            const words = Object.keys(keyWords);

            for(let word of words) {
                await new Promise(async (resolve, reject) => {
                    let hyphenSep = word.toLowerCase().split(" ").join("-");
                    https.get(`https://api.spoonacular.com/food/ingredients/search?query=${hyphenSep}&number=1&apiKey=${process.env.SPOONACULAR_KEY}`, res => {
                        let data = [];

                        res.on('data', chunk => {
                            data.push(chunk);
                        });
            
                        res.on('end', () => {
                            try {
                                const result = JSON.parse(Buffer.concat(data).toString());
                                if (!result.status) {
                                    console.log(word);
                                    if(result.totalResults === 0 || result.results[0].name.toLowerCase() !== word.toLowerCase()) {
                                        filtered.push(word);
                                    } else {
                                        fruitNames.push(word);
                                    }
                                } else {
                                    throw new Error(result.message);
                                }
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }).on('error', error => {
                        reject(error);
                    }); 
                });
                await new Promise(r => setTimeout(r, 1001));
            }

            fs.writeFileSync('./assets/fruit_names.json', JSON.stringify(fruitNames, null, 2));
            fs.writeFileSync('./assets/filtered.json', JSON.stringify(filtered, null, 2));
            // manually narrowed down from here
        }

        checkFruit(keyWords).catch(console.error);
}

const cleaned = (storeFileName, store) => {
    let fruitFileContent = fs.readFileSync(`./assets/fruits.json`);
    let fruitNames = JSON.parse(fruitFileContent);

    let storeFileContent = fs.readFileSync(`./assets/${storeFileName}`);
    let storeItems = JSON.parse(storeFileContent);

    let fruits = [];
    let filtered = [];

    storeItems.forEach(item => {
        let itemName = item.name.toLowerCase();
        let found = false;
        outer: for (let names of fruitNames) {
            const check = (word) => {
                if(itemName.includes(word)) {
                    fruits.push(item);
                    found = true;
                    return found;
                }
            };
            for(let name of names.split("/")) {
                let nameLower = name.toLowerCase();
                
                if(check(nameLower)) {
                    break outer;
                }

                if(nameLower.endsWith("s")) {
                    let singular = nameLower.endsWith("ies")
                        ? name.slice(0, -3) + 'y'
                        : name.slice(0, -1);
                    if(check(singular)) {
                        break outer;
                    }
                } else {
                    let plural = nameLower.endsWith('y')
                        ? name.slice(0, -1) + "ies"
                        : name + "s";
                    if(check(plural)) {
                        break outer;
                    }
                } 
            }
        }
        if(!found) {
            filtered.push(item);
        }
    });

    fs.writeFileSync(`./assets/${store}_cleaned.json`, JSON.stringify(fruits, null, 2));
    fs.writeFileSync(`./assets/${store}_filtered.json`, JSON.stringify(filtered, null, 2));
};

const checkVariants = async () => {
    let fileContent = fs.readFileSync("./assets/check_variants.json");
    let toCheck = JSON.parse(fileContent);
    let variants = [];

    for(let word of toCheck) {
        await new Promise(async (resolve, reject) => {
            let hyphenSep = word.toLowerCase().split(" ").join("-");
            https.get(`https://api.spoonacular.com/food/ingredients/search?query=${hyphenSep}&number=1&apiKey=${process.env.SPOONACULAR_KEY_BACKUP1}`, res => {
                let data = [];

                res.on('data', chunk => {
                    data.push(chunk);
                });
    
                res.on('end', () => {
                    try {
                        const result = JSON.parse(Buffer.concat(data).toString());
                        if (!result.status) {
                            console.log(word);
                            if(result.totalResults !== 0) {
                                variants.push( {
                                            "variant": word, 
                                            "result": result 
                                });
                            }
                        } else {
                            throw new Error(result.message);
                        }
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
            }).on('error', error => {
                reject(error);
            }); 
        });
        await new Promise(r => setTimeout(r, 1001));
    }

    fs.writeFileSync('./assets/variants_checked.json', JSON.stringify(variants, null, 2));
}

const categorised = (storeFileName, store) => {
    let fruitFileContent = fs.readFileSync(`./assets/fruits.json`);
    let fruitNames = JSON.parse(fruitFileContent);

    let storeFileContent = fs.readFileSync(`./assets/${storeFileName}`);
    let storeItems = JSON.parse(storeFileContent);

    let variantsFile = fs.readFileSync("./assets/variants_checked.json");
    let variantsContent = JSON.parse(variantsFile);
    const variantNames = variantsContent.map(variant => variant.variant);

    let fruits = [];

    fruitNames.forEach(fruit => {
        let variations = fruit.split("/");
        let items = variations.flatMap(name => {
            let nameLower = name.toLowerCase();
            let res = storeItems.filter(item => item.name.toLowerCase().split(" ").includes(nameLower));

            if(nameLower.endsWith("s")) {
                let singular = nameLower.endsWith("ies")
                    ? nameLower.slice(0, -3) + 'y'
                    : nameLower.slice(0, -1);
                res = res.concat(storeItems.filter(item => item.name.toLowerCase().split(" ").includes(singular)));
            } else {
                let plural = nameLower.endsWith('y')
                    ? nameLower.slice(0,-1) + "ies"
                    : nameLower + "s";
                res = res.concat(storeItems.filter(item => item.name.toLowerCase().split(" ").includes(plural)));
            } 

            return res.filter(item => !(item.name.toLowerCase().includes("navel") && nameLower.includes("orange")));
        });

        let fruitVariants = [{name: variations[0], urls: []}];
        for(let variation of variations) {
            const variants = variantNames.filter(variant => variant.toLowerCase().split(" ").includes(variation.toLowerCase())).map(name => name.split(" ").slice(0, -1).join(" "));
            if(variants.length > 0) {
                variants.forEach(variantName => {
                    const variantObj = variantsContent.find(obj => obj.variant.includes(variantName));
                    const id = variantObj.result.results[0].id;

                    fruitVariants.push({id: id, name: `${variantName} ${variation}`, urls: []});
                });
                
                items.forEach(item => {
                    let itemNameLower = item.name.toLowerCase();
                    let variant = variants.filter(variantName => itemNameLower.includes(variantName.toLowerCase()));
                    if(variant.length === 0) {
                        const baseObj = fruitVariants.find(obj => obj.name === variations[0]);
                        if(!baseObj.urls.includes(item.url)) {
                            baseObj.urls.push(item.url);    
                        }

                    } else {
                        const variantObj = fruitVariants.find(obj => obj.name.includes(variant[0]));
                        if(!variantObj.urls.includes(item.url)) {
                            variantObj.urls.push(item.url);
                        }
                    }

                });
            } else {
                items.forEach(item => {
                    const baseObj = fruitVariants.find(obj => obj.name === variation);
                    if(baseObj && !baseObj.urls.includes(item.url)) {
                        baseObj.urls.push(item.url);
                    }
                });
            }
        }

        // let variants = [];
        // variantNames.forEach(variant => {

        // });

        const variants = fruitVariants.filter(variant => variant.urls.length > 0);
        if(variants.length > 0) {
            fruits.push({ fruit: variations[0], variants : variants});
        }
    });
    //console.log(added.filter((id, index, self) => self.indexOf(id) !== index));
    //console.log(added.length, storeItems.length);
    fs.writeFileSync(`./assets/${store}_categorised.json`, JSON.stringify(fruits, null, 2));
}

const addIds = async (fileName, store) => {
    let file = fs.readFileSync(`./assets/${fileName}`);
    let data = JSON.parse(file);

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].variants.length; j++) {
            let variant = data[i].variants[j];
            if(!("id" in variant)) {
                
                await new Promise(async (resolve, reject) => {
                    const word = variant.name;
                    let hyphenSep = word.toLowerCase().split(" ").join("-");
                    https.get(`https://api.spoonacular.com/food/ingredients/search?query=${hyphenSep}&number=1&apiKey=${process.env.SPOONACULAR_KEY_BACKUP2}`, res => {
                        let data = [];
        
                        res.on('data', chunk => {
                            data.push(chunk);
                        });
            
                        res.on('end', () => {
                            try {
                                const result = JSON.parse(Buffer.concat(data).toString());
                                if (!result.status) {
                                    console.log(word);
                                    if(result.totalResults !== 0) {
                                        const id = result.results[0].id;
                                        variant.id = id;
                                    }
                                } else {
                                    throw new Error(result.message);
                                }
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }).on('error', error => {
                        reject(error);
                    }); 
                });
                await new Promise(r => setTimeout(r, 1001));
            } else {
                data[i].variants[j] = {
                    id: variant.id,
                    ...variant
                }
            }
        }
    }

    fs.writeFileSync(`./assets/dataset_${store}.json`, JSON.stringify(data, null, 2));
}

const addNutrition = async (store) => {
    let file = fs.readFileSync(`./assets/dataset_${store}.json`);
    let data = JSON.parse(file);

    for(let i = 0; i < data.length; i++) {
        for(let variant of data[i].variants) {

            if(!("nutrition" in variant)) {
                await new Promise(async (resolve, reject) => {
                    const word = variant.name;
                    https.get(`https://api.spoonacular.com/food/ingredients/${variant.id}/information?amount=1&number=1&apiKey=${process.env.SPOONACULAR_KEY_BACKUP3}`, res => {
                        let data = [];
        
                        res.on('data', chunk => {
                            data.push(chunk);
                        });
            
                        res.on('end', () => {
                            try {
                                const result = JSON.parse(Buffer.concat(data).toString());
                                if (!result.status) {
                                    console.log(word, result.name);
                                    variant.nutrition = result.nutrition;
                                } else {
                                    throw new Error(result.message);
                                }
                                resolve();
                            } catch (error) {
                                reject(error);
                            }
                        });
                    }).on('error', error => {
                        reject(error);
                    }); 
                });
                await new Promise(r => setTimeout(r, 1001));
            }

        }
    }

    fs.writeFileSync('./assets/data.json', JSON.stringify(data, null, 2));
}

const parseColes = (async () => {
    await new Promise(async (resolve, reject) => {
        https.get('https://hotprices.org/data/latest-canonical.coles.compressed.json.gz', res => {
            let data = [];

            const gunzip = zlib.createGunzip();

            res.pipe(gunzip);

            gunzip.on('data', chunk => {
                data.push(chunk);
            });

            gunzip.on('end', () => {
                try {
                    const result = JSON.parse(Buffer.concat(data).toString());
                    let fruitData = result.filter(item => item.category === "003");
                    
                    let fruits = [];

                    fruitData.forEach(data => {
                        fruits.push( {
                            id: data.id,
                            name: data.name,
                            url: `https://www.coles.com.au/product/${data.name.toLowerCase().split(" ").join("-")}-${data.id}`
                        });
                    });

                    fs.writeFileSync('./assets/coles_fruits.json', JSON.stringify(fruits, null, 2));
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

const combineData = () => {
    const wfile = fs.readFileSync(`./assets/data_woolworths.json`);
    let data = JSON.parse(wfile);

    const existingFruits = data.map(fruit => fruit.fruit);
    
    const cfile = fs.readFileSync(`./assets/data_coles.json`);
    const cdata = JSON.parse(cfile);

    for(const fruitObj of cdata) {
        if(existingFruits.includes(fruitObj.fruit)) {
            const existingVariants = data.find(fruit => fruit.fruit === fruitObj.fruit).variants;
            const existingVariantNames = existingVariants.map(variant => variant.name);

            for(const fruitVariant of fruitObj.variants) {
                if(existingVariantNames.includes(fruitVariant.name)) {
                    let currentVariant = existingVariants.find(variant => variant.name === fruitVariant.name);
                    currentVariant.urls = [...currentVariant.urls, ...fruitVariant.urls];
                } else {
                    existingVariants.push(fruitVariant);
                }
            }
        } else {
            data.push(fruitObj);
        }
    }
    fs.writeFileSync(`./assets/data_final.json`, JSON.stringify(data, null, 2));
}

const getImages = async () => {
    const fruitNameFile = fs.readFileSync('./assets/fruits.json');
    let fruitNames = JSON.parse(fruitNameFile);

    let images = {};

    for(const names of fruitNames) {
        const name = names.split("/")[0];
        await new Promise(async (resolve, reject) => {
            https.get(`https://pixabay.com/api/?key=45886776-57de388504fe94bd39bd3fd4a&q=${name}&image_type=illustration&colors=transparent&category=food`, res => {
                let data = [];

                res.on('data', chunk => {
                    data.push(chunk);
                });
    
                res.on('end', () => {
                    try {
                        const result = JSON.parse(Buffer.concat(data).toString());
                        if(result.totalHits > 0) {
                            const imageUrl = result.hits[0].webformatURL;
                            console.log(imageUrl);
                            images[name] = imageUrl;
                        } else {
                            images[name] = "undefined"
                        }
                        resolve();
                    } catch (error) {
                        console.error("error: ", error);
                    }
                });
            }).on('error', error => {
                reject(error);
            }); 
        });
        await new Promise(r => setTimeout(r, 100));
    }
    fs.writeFileSync('./assets/fruit_images.json', JSON.stringify(images, null, 2));
}

//cleaned('woolworths_fruits.json', 'woolworths');
//categorised('woolworths_cleaned.json', 'woolworths');
//parse('woolworths_fruits.json');
//await checkVariants();
//await addIds('data.json', 'woolworths');
//await addNutrition();


// await parseColes();
// cleaned('coles_fruits.json', 'coles');
//categorised('coles_cleaned.json', 'coles');
//await addIds('dataset_coles.json', 'coles');
//await addNutrition('coles');

//combineData();

getImages();

export default parse;