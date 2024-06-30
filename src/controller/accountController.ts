import { Request, Response } from 'express';
import { registerUser } from '../service/accountService';

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const userId = await registerUser(name, email);
  return res.status(201).json({ userId });
};