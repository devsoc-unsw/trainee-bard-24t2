
import express, { Request, Response } from 'express';
import { SERVER_PORT } from '../../config.json';
import { seasonalFruitsByState } from './routes/seasonal-fruits';
import { validSearchTerms } from './routes/valid-search-terms';
import { searchNutrient } from './routes/nutrient';
import { getFruitNutrition } from './routes/fruit';
import { getFruits, getDb } from './config/db';
import { printUniqueNutrients } from './util/printNutrients';
import cron from 'node-cron';
import { updateSeasonality } from './util/seasonality';
import { getAllItems } from './routes/items';

const errorHandler = require('http-errors-middleware');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

/**
 * daily seasonality calculator - set to run at 9am each day.
 * 
 * Seasonality values:
 *           1 - in season
 *           0 - sort of in season
 *          -1 - not in season
 */
cron.schedule('0 9 * * *', async () => {
  try {
    updateSeasonality();
  } catch (error) {
    console.error(error);
  }
});


app.get('/', (req: Request, res: Response) => {
    console.log('Hello, TypeScript with Express :)))!');
    res.send('Hello, TypeScript with Express :)))!');
});


/**
 * 
 * route for retrieving list of fruits by state with seasonality
 * 
 * parameters: 
 *     state: string - state to get seasonality data for
 * return format:
 * {
 *    fruit: string  -  name of fruit (parent)
 *    variant_name: string  -  name of fruit variant
 *    image: string  -  url for fruit image
 *    seasonality: number  -  variant's seasonality state in the format defined above
 * }
 */
app.get('/seasonal-fruits/:state', async (req: Request, res: Response) => {
    try {
      const state = req.params.state;

      return res.json(await seasonalFruitsByState(state));
    } catch (error) {
      return res.status(400).json({ message: 'Bad Request' });
    }
});

/**
 * route for retrieving list of valid searchable fruit/nutrient names
 * 
 *  return format:
 *  {
 *    word: string - the fruit/nutrient name
 *    type: string - either fruit or nutrient
 *  }
 */
app.get('/valid-search-terms/', async (req: Request, res: Response) => {
      try {
        return res.json(await validSearchTerms());
      } catch (error) {
        return res.status(400).json({ message: 'Bad Request' });
      }
});

/**
 * route for retrieving data used for fruits containing specific nutrient search result page
 * 
 * parameters: 
 *    name: string - name of nutrient
 * optional queries:
 *    amount: number  - if searching for fruits with nutrients above/below certain amount
 *    greaterThan: boolean  -  determing whether to search above (or ===) or below value.
 *                            Also determines sorting order of response.
 *                            (default = true)
 * 
 *  return format:
 *  {
 *    name: string - name of fruit
 *    image: string - image URL for fruit
 *    value: number - amount of searched nutrient contained in fruit (unit not returned)
 *  }
 */
app.get('/nutrient/:name', async (req: Request, res: Response) => {
    try {
      const nutrient: string = req.params.name;
      const amount = Number(req.query.amount);
      const greaterThan = req.query.greaterthan === undefined ? true : req.query.greaterthan === "true";

      return res.json(await searchNutrient(nutrient, amount, greaterThan));
    } catch(error) {
      return res.status(400).json({ message: 'Bad Request'});
    }
});

app.get('/fruit/', async (req: Request, res: Response) => {
  try {
    const { fruit, variantIndex } = req.query;

    return res.json(await getFruitNutrition((fruit as String), Number(variantIndex)));
  } catch (error: any) {
    return res.status(400).json({ message: error.message || 'An error occured' });
  }
});

/**
 
route for retrieving list of all fruits
return format:
{
name: string - name of fruit
image: string - image URL for fruit
}
*/
app.get('/getAllItems', async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.status(200).json({ items });
  } catch (error) {
    return res.status(400).json({ message: 'Bas Request' })
  }
})

app.use(errorHandler( { debug : true }));

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

//testing db
//addImages(getDb());
printUniqueNutrients();