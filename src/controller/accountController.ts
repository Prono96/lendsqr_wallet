import { Request, Response } from 'express';
import { registerUser, fundAccount, transferFunds, withdrawFunds, deleteUser } from '../service/accountService';

// Create User and account controller
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, identity } = req.body;
        const userId = await registerUser(name, email, identity);
        return res.status(201).json({ userId });
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

// Fund account controller
export const addFunds = async (req: Request, res: Response) => {
    try {
        const { user_id, amount } = req.body;
        await fundAccount(user_id, amount);
        console.log(user_id, amount)
        res.status(200).json({ message: 'Funds added', amount, user_id });
    } catch (error) {
        res.status(400).json({ message: error });
    }
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

// Delete user by Id
export const deleteUserAccount = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        await deleteUser(user_id)
        res.status(200).json({ message: 'User acoount deleted successfully' });
    } catch (error) {
        res.status(200).json({ message: 'Failed to delete account' });
    }
}