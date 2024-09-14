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

    fruits[0].variants[0].nutrition.nutrients.forEach((nutrient: { name: string}) => {
        words.push({
            type: "nutrient",
            word: `${nutrient.name} - More`
        });
        words.push({
            type: "nutrient",
            word: `${nutrient.name} - Less`
        });
    });

    words.sort((a, b) => a.word.localeCompare(b.word));
    return words;
}