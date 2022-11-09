import HttpException from "@/utils/exceptions/httpExceptions";
import WalletRepository from "../repository/walletRepository";

import { CreateWalletInterface } from "../interfaces/createWalletInterface";
import { IncreaseBalanceInterface } from "../interfaces/increaseBalanceInterface";
import { DecreaseBalanceInterface } from "../interfaces/decreaseBalanceInterface";

import CreateWalletUsecase from "../usecase/createWalletUsecase";
import DecreaseBalanceUsecase from "../usecase/decreaseBalanceUsecase";
import IncreaseBalanceUsecase from "../usecase/increaseBalanceUsecase";

class WalletFactory {
    private walletDB;
    private CreateWalletUsecase;
    private IncreaseBalanceUsecase
    private DecreaseBalanceUsecase
    constructor() {
         this.walletDB = new WalletRepository()
        this.CreateWalletUsecase = new CreateWalletUsecase(this.walletDB)
        this.IncreaseBalanceUsecase = new IncreaseBalanceUsecase(this.walletDB, this.walletDB)
        this.DecreaseBalanceUsecase = new DecreaseBalanceUsecase(this.walletDB, this.walletDB)
    }

    async create(user_id: CreateWalletInterface.Request): Promise<CreateWalletInterface.Response> {    
        try {
            await this.CreateWalletUsecase.execute(user_id)
        } catch (error: any) {
            throw new HttpException(error.message, error.statusCode)
        }

    }

    async increase(data: IncreaseBalanceInterface.Request): Promise<IncreaseBalanceInterface.Response> {
        try {
            await this.IncreaseBalanceUsecase.execute(data)
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async decrease(data: DecreaseBalanceInterface.Request): Promise<DecreaseBalanceInterface.Response> {
        try {
            await this.DecreaseBalanceUsecase.execute(data)
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}

const walletFactory = new WalletFactory()

export default walletFactory

