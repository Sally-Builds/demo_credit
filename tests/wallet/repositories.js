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
exports.UpdateBalanceRepoStub = exports.GetBalanceRepoStub = void 0;
const httpExceptions_1 = __importDefault(require("../../src/utils/exceptions/httpExceptions"));
const walletFakeData_1 = __importDefault(require("./walletFakeData"));
class GetBalanceRepoStub {
    getBalance(account_no) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const balance = walletFakeData_1.default.balance;
                console.log(`balance fetched with value ${balance}`);
                return balance;
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
    }
}
exports.GetBalanceRepoStub = GetBalanceRepoStub;
class UpdateBalanceRepoStub {
    updateBalance(account_no_and_new_balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                walletFakeData_1.default.balance = account_no_and_new_balance.new_balance;
                console.log(`balance updated with new value ${walletFakeData_1.default.balance}`);
                return;
            }
            catch (error) {
                throw new httpExceptions_1.default(error.message, error.statusCode);
            }
        });
    }
}
exports.UpdateBalanceRepoStub = UpdateBalanceRepoStub;
