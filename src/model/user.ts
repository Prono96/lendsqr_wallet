import db from '../database';

interface User {
  id: number;
  name: string;
  email: string;
}

export const createUser = async (user: Omit<User, 'id'>): Promise<number[]> => {
  return await db('users').insert(user);   
};


