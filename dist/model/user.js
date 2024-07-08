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
exports.deleteById = exports.getUserById = exports.createUser = void 0;
const database_1 = __importDefault(require("../database"));
// create user schema
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, database_1.default)('users').insert(user);
});
exports.createUser = createUser;
// Get userById schema
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, database_1.default)('users').where({ id }).first();
});
exports.getUserById = getUserById;
// Delete user
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, database_1.default)('users').where({ id }).del();
});
exports.deleteById = deleteById;
