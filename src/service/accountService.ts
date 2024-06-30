import { createUser } from '../model/user';
import { createAccount, getAccountByUserId, updateAccountBalance } from '../model/account';
import db from '../database';

// Register users
export const registerUser = async (name: string, email: string) => {
  const [userId] = await createUser({ name, email });
  await createAccount({ user_id: userId, balance: 0 });
  return userId;
};

// Fund account by accountId
export const fundAccount = async (user_id: number, amount: number) => {
    const account = await getAccountByUserId(user_id);
    const newBalance = account.balance + amount;
    await updateAccountBalance(user_id, newBalance);
  };
  