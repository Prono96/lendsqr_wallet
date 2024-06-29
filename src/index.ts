import  express, { Request, Response } from 'express';
const app = express();

const port = process.env.PORT || 3000;

app.get('/home', (req: Request, res: Response) => {
    return res.status(200).send("Jesus is  king")
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});