import { config } from 'dotenv'
const envPath = process.env.NODE_ENV == 'development' ? '.env' : '.env.production';
config({ path: envPath })

import  express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './routes/accountRoute';
import db from './database'
const app = express();
db;


const port = process.env.PORT || 3000;

app.get('/', async(req: Request, res: Response) => {
    res.status(200).send("Welcome Chiboy the new backend engineer at lendsqr")
})

app.get('/testing', async(req: Request, res: Response) => {
    try {
        const records = await db('test').select('*');
        res.json(records);
      } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch records' });
      }
})

app.use(bodyParser.json());
app.use('/api', accountRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});