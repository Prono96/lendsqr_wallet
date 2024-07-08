"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.withdrawFunds = exports.transferFunds = exports.fundAccount = exports.registerUser = void 0;
const user_1 = require("../model/user");
const account_1 = require("../model/account");
const verificationService_1 = __importDefault(require("../helperClass/verificationService"));
const database_1 = __importDefault(require("../database"));
// Register users
const registerUser = (name, email, identity) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user is blacklisted
    const verificationService = new verificationService_1.default();
    const result = yield verificationService.blackListIdentity(identity);
    if (result.status === 'success' && result.message === 'Successful') {
        const error = new Error();
        error.status = 403;
        error.success = false;
        error.message = 'User is blacklisted';
        throw error;
    }
    const [userId] = yield (0, user_1.createUser)({ name, email });
    yield (0, account_1.createAccount)({ user_id: userId, balance: 0 });
    return userId;
});
exports.registerUser = registerUser;
// Fund account by accountId
const fundAccount = (user_id, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, account_1.getAccountByUserId)(user_id);
    const newBalance = account.balance + amount;
    yield (0, account_1.updateAccountBalance)(user_id, newBalance);
});
exports.fundAccount = fundAccount;
// Transfer funds to another user
const transferFunds = (from_user_id, to_user_id, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const fromAccount = yield (0, account_1.getAccountByUserId)(from_user_id);
    const toAccount = yield (0, account_1.getAccountByUserId)(to_user_id);
    if (fromAccount.balance < amount) {
        throw new Error('Insufficient funds');
    }
    yield database_1.default.transaction((trx) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, account_1.updateAccountBalance)(from_user_id, fromAccount.balance - amount);
        yield (0, account_1.updateAccountBalance)(to_user_id, toAccount.balance + amount);
    }));
});
exports.transferFunds = transferFunds;
// Withdraw Funds 
const withdrawFunds = (user_id, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield (0, account_1.getAccountByUserId)(user_id);
    if (account.balance < amount) {
        throw new Error('Insufficient funds');
    }
    const newBalance = account.balance - amount;
    yield (0, account_1.updateAccountBalance)(user_id, newBalance);
});
exports.withdrawFunds = withdrawFunds;
// Delete a user
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const removeUser = yield (0, user_1.deleteById)(user_id);
    if (!removeUser) {
        throw new Error("failed to delete user!");
    }
    return removeUser;
});
exports.deleteUser = deleteUser;
