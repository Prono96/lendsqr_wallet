"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;
const db = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        port: dbPort,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: { min: 0, max: 7 },
});
// Check if connection is successful
db.raw('SELECT 1')
    .then(() => {
    console.log('Connected to Lendsqr_wallet database successfully.');
})
    .catch((err) => {
    console.error('Error connecting to MySQL database:', err);
});
exports.default = db;
