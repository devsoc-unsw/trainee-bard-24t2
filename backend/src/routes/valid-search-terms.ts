import { getFruits } from '../config/db';
interface Word {
    type: string,
    word: string
}

export async function validSearchTerms() : Promise<Word[]> {
    let words: Array<Word> = [];

    const fruits = await getFruits();
    fruits.forEach(fruit => {
        words.push({
            type: "fruit",
            word: fruit.fruit
        });
    });

    Object.entries(fruits[0].variants[0].nutrition).forEach(([objName, nutriType]) => {
        if(Array.isArray(nutriType)) {
            nutriType.forEach((nutri: {name: string}) => {
                words.push({
                    type: "nutrient",
                    word: nutri.name
                });
            });
        } else {
            if(objName !== "weightPerServing") {
                Object.keys(nutriType as Object).forEach((nutrient: string) => {
                    words.push({
                        type: "nutrient",
                        word: nutrient
                    })
                });
            }
        }
    });

    return words;
}