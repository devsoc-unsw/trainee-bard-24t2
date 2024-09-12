// Helper functions that would help a lot :D

// Variant interface from the database
interface databaseVariant {
    nutrition: databaseNutrition
}

interface databaseNutrition {
    nutrients: 
        Array<{
            amount: number,
            name: string
            percentOfDailyNeeds: number,
            unit: string
        }>
}

interface Nutrition {
    vitamins: Array<Nutrient>
    macros: {
        fat: Array<Nutrient>
        carbohydrates: Array<Nutrient>
        protein: Array<Nutrient>
    }
    minerals: Array<Nutrient>
    other: Array<Nutrient>
}

interface Nutrient {
    name: string,
    amount: number,
    unit: string,
    percentOfDailyNeeds: number
}

const MACROS = ["Fat", "Carbohydrates", "Protein"]
const CARB_TYPES = ["Sugar", "Fiber"]
const OTHER_VITAMINS = ["Folate", "Folic Acid"]
const OTHER_MINERALS = ["Copper", "Fluoride", "Iron", "Manganese", "Phosphorus", "Zinc"];

/**
 * Organises the nutrients of a given fruit variant into the given interface for Nutrition above
 * Doesn't include if the fruit has 0 (none) of that nutrient.
 */
export function organiseNutrients(variant: databaseVariant): Nutrition {
    const result: Nutrition = 
    {
        vitamins: [],
        macros: 
        {
            fat: [],
            carbohydrates: [], 
            protein: []
        },
        minerals: [],
        other: []
    }

    const nutrients = variant.nutrition.nutrients;

    for (const n of nutrients) {
        const { name, amount } = n;

        if (amount === 0) continue;

        if (name.startsWith("Vitamin") || OTHER_VITAMINS.includes(name)) {
            result.vitamins.push(n);
        } else if (name.endsWith("ium") || OTHER_MINERALS.includes(name)) {
            result.minerals.push(n);
        } else if (MACROS.includes(name)) {
            // Place main macro in corresponding macro field.
            result.macros[name.toLowerCase() as keyof typeof result.macros].push(n);
        } else if (name.endsWith("fat")) {
            result.macros.fat.push(n);
        } else if (CARB_TYPES.includes(name)) {
            result.macros.carbohydrates.push(n);
        } else {
            result.other.push(n);
        }
    }

    return result;
}