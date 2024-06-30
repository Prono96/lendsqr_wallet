import db from '../database';

interface Account {
    id: number;
    user_id: number;
    balance: number;
}

// Create account schema
export const createAccount = async (account: Omit<Account, 'id'>): Promise<number[]> => {
    return await db('accounts').insert(account);
};

// Get accountById schema
export const getAccountByUserId = async (user_id: number): Promise<Account> => {
    return await db('accounts').where({ user_id }).first();
};

// Update Balance schema
export const updateAccountBalance = async (user_id: number, balance: number): Promise<Account> => {
    return await db('accounts').where({ user_id }).update({ balance });
};


