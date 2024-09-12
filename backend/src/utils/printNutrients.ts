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
    fs.writeFile("./src/utils/Nutrient List.txt", "", (err: any) => {
        if (err) throw err;
    });

    const sortedNames = [...(nutrientNames)]
    sortedNames.sort();

    for (const name of sortedNames) {
        fs.appendFile("./src/utils/Nutrient List.txt", `${name}\n`, (err: any) => {
            if (err) throw err;
        });
    }
}
