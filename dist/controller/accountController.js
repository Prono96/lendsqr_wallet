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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAccount = exports.withdraw = exports.transfer = exports.addFunds = exports.createUser = void 0;
const accountService_1 = require("../service/accountService");
// Create User and account controller
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, identity } = req.body;
        const userId = yield (0, accountService_1.registerUser)(name, email, identity);
        return res.status(201).json({ userId });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.createUser = createUser;
// Fund account controller
const addFunds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, amount } = req.body;
        yield (0, accountService_1.fundAccount)(user_id, amount);
        console.log(user_id, amount);
        res.status(200).json({ message: 'Funds added', amount, user_id });
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});
exports.addFunds = addFunds;
// Transfer funds controller
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from_user_id, to_user_id, amount } = req.body;
        yield (0, accountService_1.transferFunds)(from_user_id, to_user_id, amount);
        res.status(200).json({ message: 'Funds transferred' });
    }
    catch (error) {
        res.status(400).json({ message: 'Insufficient funds' });
    }
});
exports.transfer = transfer;
// Withdraw funds controller
const withdraw = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, amount } = req.body;
        yield (0, accountService_1.withdrawFunds)(user_id, amount);
        res.status(200).json({ message: 'Funds withdrawn' });
    }
    catch (error) {
        res.status(400).json({ message: 'Funds withdrawal failed!' });
    }
});
exports.withdraw = withdraw;
// Delete user by Id
const deleteUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        yield (0, accountService_1.deleteUser)(user_id);
        res.status(200).json({ message: 'User acoount deleted successfully' });
    }
    catch (error) {
        res.status(200).json({ message: 'Failed to delete account' });
    }
});
exports.deleteUserAccount = deleteUserAccount;
