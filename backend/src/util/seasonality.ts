import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDb }  from '../config/db';
import zlib from 'zlib';
import https from 'https';
import { PythonShell } from "python-shell";

interface Fruit {
    id: number,
    name: string,
    current_price: number,
    price_history: Array<number>
}

export async function updateSeasonality() {
    console.log("starting seasonality check...");
    const colesUrl = "https://hotprices.org/data/latest-canonical.coles.compressed.json.gz";
    const colesCategory = "003"
    const wooliesUrl = "https://hotprices.org/data/latest-canonical.woolies.compressed.json.gz";
    const wooliesCategory = "000";

    const db = getDb();
    const querySnapshot = await getDocs(collection(db, 'fruits'));

    const colesJson = await getJSON(colesUrl, colesCategory);
    const wooliesJson = await getJSON(wooliesUrl, wooliesCategory);

    for(const fruitDoc of querySnapshot.docs){
        let variants = fruitDoc.get('variants');

        for(let i = 0; i < variants.length; i++) {
            let variant = variants[i];

            let wooliesExists = false;
            let colesExists = false;

            let wooliesInSeason = false;
            let colesInSeason = false;

            for(const url of variant.urls) {
                let priceData;
                if(url.includes("coles")) {
                    colesExists = true;
                    if(!!colesInSeason) {
                        continue;
                    }
                    const urlId = parseInt(url.split("/").pop()?.split("-").pop() as string);
                    priceData = colesJson.find(item => item.id === urlId);
                } else if(url.includes("woolworths")) {
                    wooliesExists = true;
                    if(!!wooliesInSeason) {
                        continue;
                    }
                    const urlId = parseInt(url.split("/").slice(-2, -1)[0]);
                    priceData = wooliesJson.find(item => item.id === urlId);
                } else {
                    throw Error(`Store not accounted for. Please verify the following URL: ${url}`);
                }

                if(priceData) {
                    const priceJson = JSON.stringify(priceData, ["name", "price_history", "date", "price"]);
                    const result = await PythonShell.run(
                        './src/util/seasonal_price.py', 
                        { 
                            pythonPath: './.venv/Scripts/python.exe',
                            args: [priceJson]
                        });
                    
                    const seasonalityResult = JSON.parse(result[0]);

                    const date = new Date();
                    const currentMonth = date.toLocaleString('default', { month: 'long' });

                    // if no months with avg below threshold, we ignore the month requirement for seasonality
                    let inSeason = priceData.current_price <= seasonalityResult.threshold && 
                                    (seasonalityResult.months.includes(currentMonth) || seasonalityResult.months.length < 1);
                    if(inSeason) {
                        if(url.includes("coles")) {
                            colesInSeason = true;
                        } else {
                            wooliesInSeason = true;
                        }

                        if(colesInSeason && wooliesInSeason) {
                            break;
                        }
                    }
                }
            }

            if(!colesExists) {
                colesInSeason = wooliesInSeason;
            } else if(!wooliesExists) {
                wooliesInSeason = colesInSeason;
            }

            let seasonality = colesInSeason && wooliesInSeason ? 1 
                                : colesInSeason || wooliesInSeason ? 0 
                                                                    : -1; 
            
            const docRef = doc(db, 'fruits', fruitDoc.id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const data = docSnap.data();
                const updated = [...data.variants];

                updated[i] = {
                    ...updated[i],
                    seasonality: seasonality
                };
                await updateDoc(docRef, {
                    variants: updated
                });
            }

            //console.log(`${variant.name} is ${seasonality == 1 ? "" : seasonality == 0 ? "sort of" : "not"} in season`)
        }
    }
    //console.log("updated");
}

async function getJSON(url: string, category: string): Promise<Fruit[]> {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data: any[] = [];

            const gunzip = zlib.createGunzip();
            res.pipe(gunzip);

            gunzip.on('data', chunk => {
                data.push(chunk);
            });

            gunzip.on('end', () => {
                try {
                    const result = JSON.parse(Buffer.concat(data).toString());
                    let fruitData = result.filter((item: { category: string; }) => item.category === category);
                    
                    let fruits: Array<Fruit> = [];

                    fruitData.forEach((data: { id: number, name: string, price: number, priceHistory: Array<number> }) => {
                        fruits.push(
                            {
                                "id": data.id,
                                "name": data.name,
                                "current_price": data.price,
                                "price_history": data.priceHistory
                            }
                        );
                    });

                    resolve(fruits);
                } catch (error) {
                    reject(error);  
                }
            });
        }).on('error', error => {
            reject(error);  
        });
    });
}