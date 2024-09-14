import { getFruits } from '../config/db';
interface Fruit {
    fruit: string,
    variant_name: string,
    image: string,
    seasonality: number
}

export async function seasonalFruitsByState(state: string) : Promise<Fruit[]> {
    const pkmn = ["kanto", "johto", "hoenn", "sinnoh", "unova", "kalos", "alola", "galar", "paldea"];
    const stateLower = state.toLowerCase();
    if(stateLower === "nsw") {
        let seasonalityResults: Array<Fruit> = [];
        const fruits = await getFruits();
    
        for(const fruit of fruits) {
            for(const variant of fruit.variants) {
                seasonalityResults.push({
                    fruit: fruit.fruit,
                    variant_name: variant.name,
                    image: fruit.image,
                    seasonality: variant.seasonality
                });
            }
        }

        seasonalityResults.sort((a, b) => b.seasonality - a.seasonality);
        return seasonalityResults;
    } else if(pkmn.includes(state)){
        return new Promise((resolve, reject) => {
            const berries = ["Aguav Berry", "Apicot Berry", "Aspear Berry", "Babiri Berry", "Belue Berry", "Bluk Berry", "Charti Berry", "Cheri Berry", "Chesto Berry", "Chilan Berry", "Chople Berry", "Coba Berry", "Colbur Berry", "Cornn Berry", "Custap Berry", "Durin Berry", "Enigma Berry", "Figy Berry", "Ganlon Berry", "Grepa Berry", "Haban Berry", "Hondew Berry", "Iapapa Berry", "Jaboca Berry", "Kasib Berry", "Kebia Berry", "Kee Berry", "Kelpsy Berry", "Lansat Berry", "Leppa Berry", "Liechi Berry", "Lum Berry", "Mago Berry", "Magost Berry", "Maranga Berry", "Micle Berry", "Nanab Berry", "Nomel Berry", "Occa Berry", "Oran Berry", "Pamtre Berry", "Passho Berry", "Payapa Berry", "Pecha Berry", "Persim Berry", "Petaya Berry", "Pinap Berry", "Pomeg Berry", "Qualot Berry", "Rabuta Berry", "Rawst Berry", "Razz Berry", "Rindo Berry", "Roseli Berry", "Rowap Berry", "Salac Berry", "Shuca Berry", "Sitrus Berry", "Spelon Berry", "Starf Berry", "Tamato Berry", "Tanga Berry", "Wacan Berry", "Watmel Berry", "Wepear Berry", "Wiki Berry", "Yache Berry"];

            const result: Array<Fruit> = berries.map(berry => {
                return {
                    fruit: berry,
                    variant_name: berry,
                    image: `https://www.serebii.net/itemdex/sprites/sv/${berry.split(" ").join("").toLowerCase()}.png`,
                    seasonality: [-1, 0, 1][Math.floor(Math.random() * 3)]
                }
            });

            result.sort((a, b) => b.seasonality - a.seasonality);

            resolve(result);
        });
    } else {
        return new Promise ((resolve, reject) => {
            resolve([]);
        });
    }

}