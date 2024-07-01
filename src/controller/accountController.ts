import { Request, Response } from 'express';
import { registerUser, fundAccount, transferFunds, withdrawFunds } from '../service/accountService';

// Create User and account controller
export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const userId = await registerUser(name, email);
    return res.status(201).json({ userId });
};

// Fund account controller
export const addFunds = async (req: Request, res: Response) => {
    const { user_id, amount } = req.body;
    await fundAccount(user_id, amount);
    console.log(user_id, amount)
    res.status(200).json({ message: 'Funds added', amount, user_id });
};

// Transfer funds controller
export const transfer = async (req: Request, res: Response) => {
    try {
        const { from_user_id, to_user_id, amount } = req.body;
        await transferFunds(from_user_id, to_user_id, amount);
        res.status(200).json({ message: 'Funds transferred' });
    } catch (error) {
        res.status(400).json({ message: 'Insufficient funds' });
    }
};

// Withdraw funds controller
export const withdraw = async (req: Request, res: Response) => {
    try {
        const { user_id, amount } = req.body;
        await withdrawFunds(user_id, amount);
        res.status(200).json({ message: 'Funds withdrawn' });
    } catch (error) {
        res.status(400).json({ message: 'Funds withdrawal failed!' });
    }
};