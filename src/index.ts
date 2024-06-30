import  express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import accountRoutes from './routes/accountRoute';
import { config } from 'dotenv'
import db from './database'
const app = express();
db;

const port = process.env.PORT || 3000;

app.get('/home', (req: Request, res: Response) => {
    return res.status(200).send("Jesus is  king")
})

app.use(bodyParser.json());
app.use('/api', accountRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});