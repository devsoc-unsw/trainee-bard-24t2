import { getFruits } from "../config/db";
import { Nutrition, organiseNutrients } from "../util/helpers";

// Returns nutrition of the given fruit variant in the format desired by the frontend
export async function getFruitNutrition(fruitName: String, variantId: number): Promise<Nutrition> {
    const fruits = await getFruits();

    for (const elem of fruits) {
        if (elem.fruit === fruitName) {
            for (const v of elem.variants) {
                if (v.id === variantId) {
                    return organiseNutrients(v);
                }
            }
        }
    }

    // This shouldn't happen!!!
    throw new Error(`No nutrition data found for fruit: ${fruitName} with variantId: ${variantId}`);
}