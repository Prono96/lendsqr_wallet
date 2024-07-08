"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountController_1 = require("../controller/accountController");
const authentication_1 = require("../auth/authentication");
const router = express_1.default.Router();
router.post('/users', accountController_1.createUser);
router.post('/fund', authentication_1.authenticateToken, accountController_1.addFunds);
router.post('/transfer', authentication_1.authenticateToken, accountController_1.transfer);
router.post('/withdraw', authentication_1.authenticateToken, accountController_1.withdraw);
router.delete('/delete-user', authentication_1.authenticateToken, accountController_1.deleteUserAccount);
exports.default = router;
