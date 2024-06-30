import db from '../database';

interface Account {
  id: number;
  user_id: number;
  balance: number;
}

export const createAccount = async (account: Omit<Account, 'id'>): Promise<number[]> => {
  return await db('accounts').insert(account);
};


