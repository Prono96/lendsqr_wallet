"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const FAUX_TOKEN = process.env.FAUX_TOKEN;
// Middleware to protect routes
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || token !== FAUX_TOKEN)
        return res.sendStatus(401);
    next();
};
exports.authenticateToken = authenticateToken;
