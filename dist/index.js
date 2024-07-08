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
const dotenv_1 = require("dotenv");
const envPath = process.env.NODE_ENV == 'development' ? '.env' : '.env.production';
(0, dotenv_1.config)({ path: envPath });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const accountRoute_1 = __importDefault(require("./routes/accountRoute"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
database_1.default;
const port = process.env.PORT || 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send("Welcome Chiboy the new backend engineer at lendsqr");
}));
// Testing the database
app.get('/testing', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const records = yield (0, database_1.default)('test').select('*');
        res.json(records);
    }
    catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ error: 'Failed to fetch records' });
    }
}));
app.use(body_parser_1.default.json());
app.use('/api', accountRoute_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
