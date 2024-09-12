import { getFruits } from "../config/db";

const fs = require('fs');

const NUTRIENT_LIST_PATH = "./src/util/nutrient_list.txt";

export async function printUniqueNutrients() {
    const fruits = await getFruits();
    const nutrientNames = new Set<string>();

    for (const f of fruits) {
        // console.log(f);
        for (const v of f.variants) {
            // console.log(v.nutrition);
            for (const n of v.nutrition.nutrients) {
                nutrientNames.add(n.name);
            }
        }
    }

    // Clear file
    fs.writeFile(NUTRIENT_LIST_PATH, "", (err: any) => {
        if (err) throw err;
    });

    // Brendan: idk why it's not alphabetically sorting properly
    const sortedNames = [...(nutrientNames)];
    sortedNames.sort((a, b) => a.localeCompare(b));

    for (const name of sortedNames) {
        fs.appendFile(NUTRIENT_LIST_PATH, `${name}\n`, (err: any) => {
            if (err) throw err;
        });
    }
}
