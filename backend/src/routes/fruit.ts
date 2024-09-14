import { getFruits } from "../config/db";
import { Nutrition, organiseNutrients } from "../util/helpers";

interface FruitResult {
    nutrition: Nutrition,
    variants: Array<{
        name: String,
        variantIndex: number
    }>,
    imgUrl: String
}

// Returns nutrition of the given fruit variant in the format desired by the frontend
export async function getFruitNutrition(fruitName: String, variantIndex: number): Promise<FruitResult> {
    const fruits = await getFruits();

    for (const elem of fruits) {
        if (elem.fruit.toLowerCase() === fruitName.toLowerCase()) {
            const v = elem.variants[variantIndex];
                return {
                    nutrition: organiseNutrients(v),
                    variants: elem.variants.map((elem: { name: any; }, index: Number) => {
                        return {
                            name: elem.name,
                            variantIndex: index
                        }
                    }),
                    imgUrl: elem.image
                };
        }
    }

    // This shouldn't happen!!!
    throw new Error(`No nutrition data found for fruit: ${fruitName} with variantIndex: ${variantIndex}`);
}