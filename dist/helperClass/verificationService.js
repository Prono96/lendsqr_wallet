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
(0, dotenv_1.config)();
const axios_1 = __importDefault(require("axios"));
const token = process.env.LENDSQR_API_KEY;
class VerificationService {
    constructor() {
        this.axiosInstance = axios_1.default.create({
            baseURL: 'https://adjutor.lendsqr.com/v2/verification',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    blackListIdentity(identity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get(`/karma/${identity}`);
                return response.data;
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error) && error.response) {
                    return error.response.data;
                }
                throw error;
            }
        });
    }
}
exports.default = VerificationService;
