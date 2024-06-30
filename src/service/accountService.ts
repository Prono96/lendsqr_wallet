import { createUser } from '../model/user';
import { createAccount } from '../model/account';
import db from '../database';

// Register users
export const registerUser = async (name: string, email: string) => {
  const [userId] = await createUser({ name, email });
  await createAccount({ user_id: userId, balance: 0 });
  return userId;
};
