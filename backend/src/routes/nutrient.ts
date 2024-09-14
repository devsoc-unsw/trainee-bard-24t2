import { getFruits } from '../config/db';

interface Fruit {
    name: string,
    image: string,
    value: number
}

export async function searchNutrient(nutrient: string, amount?: number, greaterThan: boolean = true) : Promise<Fruit[]> {
    const compare = (nutriAmnt: number) => {
        if(amount) {
            if(greaterThan) {
                return nutriAmnt >= amount;
            } else {
                return nutriAmnt < amount;
            }
        }
        return nutriAmnt > 0;
    }; 
    
    const nutrientLower = nutrient.toLowerCase();
    let searchResults: Array<Fruit> = [];
    const fruits = await getFruits();

    frootLoop: for(const fruit of fruits) {
        for(const variant of fruit.variants) {
            const res = variant.nutrition.nutrients.find((nutri: {name: string, amount: number}) => 
                nutri.name.toLowerCase() === nutrientLower && compare(nutri.amount)
            );
            if(res) {
                searchResults.push({
                    name: fruit.fruit,
                    image: fruit.image,
                    value: res.amount
                });
                continue frootLoop;
            }
        }
    }


    // searching for fruits high in value will sort largest to smallest (e.g. searching for fruit high in vitamin c), 
    // while searching for fruits low in value will sort smallest to largest (e.g. searching for fruit with low fat).
    searchResults.sort((a, b) => greaterThan ? b.value - a.value : a.value - b.value);

    return searchResults;
}