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
    macros: Array<Nutrient>
    minerals: Array<Nutrient>
    other: Array<Nutrient>
}

interface Nutrient {
    name: string,
    amount: number,
    unit: string,
    percentOfDailyNeeds: number
}

/**
 * Organises the nutrients of a given fruit variant into the given interface for Nutrition above
 * Doesn't include if the fruit has 0 (none) of that nutrient.
 */
export function organiseNutrients(variant: databaseVariant): Nutrition {
    const result: Nutrition = 
    {
        vitamins: [],
        macros: [],
        minerals: [],
        other: []
    }

    const nutrients = variant.nutrition.nutrients;

    for (const n of nutrients) {
        const { name, amount, unit, percentOfDailyNeeds } = n;

        if (amount === 0) continue;

        if (name.startsWith("Vitamin")) {
            result.vitamins.push(n);
        } else if ()
    }

    return result;
}