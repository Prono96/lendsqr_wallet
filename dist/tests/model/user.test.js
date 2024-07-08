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
const user_1 = require("../../model/user");
const database_1 = __importDefault(require("../../database"));
jest.mock('../../database', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        insert: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([1])
    }))
}));
describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
        const result = yield (0, user_1.createUser)(user);
        expect(result).toBe({ userId: 1 });
        // Verify that the mock insert function was called with the correct arguments
        const mockDbInstance = (0, database_1.default)();
        expect(mockDbInstance.insert).toHaveBeenCalledWith(user);
        expect(mockDbInstance.returning).toHaveBeenCalledWith('id');
    }));
});
