import { createUser, getUserById, deleteById } from '../model/user';
import { createAccount, getAccountByUserId, updateAccountBalance } from '../model/account';
import VerificationService from '../helperClass/verificationService';
import db from '../database';


interface CustomError extends Error {
    status?: number;
    success?: boolean;
}

// Register users
export const registerUser = async (name: string, email: string, identity: string) => {
    // check if user is blacklisted
    const verificationService = new VerificationService();
    const result = await verificationService.blackListIdentity(identity); 
      
    if (result.status === 'success' && result.message === 'Successful') {
        const error: CustomError = new Error() as CustomError;
        error.status = 403;
        error.success = false;
        error.message = 'User is blacklisted';
        throw error;
    }
            
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

// Transfer funds to another user
export const transferFunds = async (from_user_id: number, to_user_id: number, amount: number) => {
    const fromAccount = await getAccountByUserId(from_user_id);
    const toAccount = await getAccountByUserId(to_user_id);

    if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds');
    }

    await db.transaction(async trx => {
        await updateAccountBalance(from_user_id, fromAccount.balance - amount);
        await updateAccountBalance(to_user_id, toAccount.balance + amount);
    });
};

// Withdraw Funds 
export const withdrawFunds = async (user_id: number, amount: number) => {
    const account = await getAccountByUserId(user_id);

    if (account.balance < amount) {
        throw new Error('Insufficient funds');
    }

    const newBalance = account.balance - amount;
    await updateAccountBalance(user_id, newBalance);
};

// Delete a user
export const deleteUser = async (user_id: number) => {
    const removeUser = await deleteById(user_id)

    if(!removeUser) {
        throw new Error("failed to delete user!")
    }
    
    return removeUser;
}