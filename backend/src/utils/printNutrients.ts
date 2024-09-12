import { getFruits } from "../config/db";

const fs = require('fs')

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
    fs.writeFile("./src/utils/nutrient_list.txt", "", (err: any) => {
        if (err) throw err;
    });

    const sortedNames = [...(nutrientNames)]
    sortedNames.sort((a, b) => a.localeCompare(b));

    for (const name of sortedNames) {
        fs.appendFile("./src/utils/nutrient_list.txt", `${name}\n`, (err: any) => {
            if (err) throw err;
        });
    }
}
