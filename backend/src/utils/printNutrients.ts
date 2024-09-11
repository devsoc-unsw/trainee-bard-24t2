import { getFruits } from "../config/db";

async function main() {
    const fruits = await getFruits();

    for (const f of fruits) {
        console.log(f);
    }
}

main();