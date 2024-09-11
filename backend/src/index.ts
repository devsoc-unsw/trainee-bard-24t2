
import express, { Request, Response } from 'express';
import { SERVER_PORT } from '../../config.json';
import { seasonalFruitsByState } from './routes/seasonal-fruits';
import { validSearchTerms } from './routes/valid-search-terms';
import { searchNutrient } from './routes/nutrient';
import { getFruits, getDb } from './config/db';

const errorHandler = require('http-errors-middleware');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

/*
app.post('/login', async (req: Request, res: Response, next : NextFunction) => {
  const { gID, password } = req.body;
  
  try {
    const d = await login(gID, password);
    res.send(d);
  } catch (e) {
    next(e);
  }
});

app.get('/notices', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const result = await notices();
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.get('/studentDetails', async (req: Request, res: Response, next: NextFunction) => {
  const { gID } = req.query;

  try {
    const result = await studentDetails(gID as string);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.get('/staffDetails', async (req: Request, res: Response, next: NextFunction) => {
  const { gID } = req.query;

  try {
    const result = await staffDetails(gID as string);
    res.send(result);
  } catch (e) {
    next(e);
  }

});

app.get('/studentCards', async (req: Request, res: Response, next: NextFunction) => {

  try {
    const result = await studentCards();
    res.send(result);
  } catch (e) {
    next(e);
  }
});

app.post('/enrolStudent', async (req: Request, res: Response, next: NextFunction) => {
  const { gID, name, password, profileUrl, degree, house } = req.body;

  try {
    const result = await enrolStudent(gID, name, password, profileUrl, degree, house);
    res.send(result);
  } catch (e) {
    next(e);
  }

});*/

app.use(errorHandler( { debug : true }));

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port http://localhost:${SERVER_PORT}`);
});

//testing db
//addImages(getDb());