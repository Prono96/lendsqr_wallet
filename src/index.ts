import  express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './routes/accountRoute';
import { config } from 'dotenv'
import db from './database'
const app = express();
db;

const port = process.env.PORT || 3000;

app.get('/home', async(req: Request, res: Response) => {
    res.status(200).send("Welcome Chiboy the new backend engineer at lendsqr")
})

app.use(bodyParser.json());
app.use('/api', accountRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});