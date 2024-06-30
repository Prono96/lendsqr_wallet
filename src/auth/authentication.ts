import dotenv from 'dotenv';
dotenv.config();
import { Request, Response } from 'express';

const FAUX_TOKEN = process.env.FAUX_TOKEN;


// Middleware to protect routes
export const authenticateToken = (req: Request, res: Response, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token || token !== FAUX_TOKEN) return res.sendStatus(401);
    next();
};