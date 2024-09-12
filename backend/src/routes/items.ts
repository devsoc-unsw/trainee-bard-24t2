import { getFruits } from '../config/db';

interface Fruit {
    name: string,
    image: string
}

export async function getAllItems() {
    try {
        const data = await getFruits();
        
        const items = data.map((fruit: any) => ({
          name: fruit.fruit,
          image: fruit.image,
        }));
        
        return items;
      } catch (error) {
        console.error('Error retrieving items:', error);
        throw error;
      }
}