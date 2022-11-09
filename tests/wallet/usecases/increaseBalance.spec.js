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
const globals_1 = require("@jest/globals");
const increaseBalanceUsecase_1 = __importDefault(require("../../../src/resources/wallet/usecase/increaseBalanceUsecase"));
const repositories_1 = require("../repositories");
const makeSut = () => {
    const getBalanceRepoStub = new repositories_1.GetBalanceRepoStub();
    const updateBalanceRepoStub = new repositories_1.UpdateBalanceRepoStub();
    return {
        sut: new increaseBalanceUsecase_1.default(getBalanceRepoStub, updateBalanceRepoStub),
        UpdateBalanceRepoStub: updateBalanceRepoStub,
        GetBalanceRepoStub: getBalanceRepoStub
    };
};
(0, globals_1.describe)('Should increase value balance', () => {
    (0, globals_1.it)('should call getBalance with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, GetBalanceRepoStub } = makeSut();
        const createPostSpy = globals_1.jest.spyOn(GetBalanceRepoStub, 'getBalance');
        yield sut.execute({ credit_wallet: 'kadf', amount: 9 });
        (0, globals_1.expect)(createPostSpy).toHaveBeenCalledWith('kadf');
    }));
});
