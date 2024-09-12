
import express, { Request, Response } from 'express';
import { SERVER_PORT } from '../../config.json';
import { seasonalFruitsByState } from './routes/seasonal-fruits';
import { validSearchTerms } from './routes/valid-search-terms';
import { searchNutrient } from './routes/nutrient';
import { getFruits, getDb } from './config/db';
import { printUniqueNutrients } from './utils/printNutrients';
import cron from 'node-cron';
import { updateSeasonality } from './util/seasonality';

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

app.get('/seasonal-fruits/', (req: Request, res: Response) => {
    const { state } = req.query;

    return res.json(seasonalFruitsByState(state as String));
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

app.use(errorHandler( { debug : true }));

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

//testing db
//addImages(getDb());
printUniqueNutrients();