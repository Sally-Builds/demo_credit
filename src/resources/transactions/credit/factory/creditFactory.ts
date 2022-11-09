import HttpException from "@/utils/exceptions/httpExceptions";
import CreateCreditUsecase from "../usecase/createCreditUsecase";
import GetAllCreditUsecase from "../usecase/getAllCreditUsecase";
import { GetAllCreditInterface } from "../interfaces/getAllCreditInterface";
import { CreateCreditInterface } from "../interfaces/createCreditInterface";
import WalletRepository from "@/resources/wallet/repository/walletRepository";
import CreditRepository from "../repository/creditRepository";
import IncreaseBalanceUsecase from "@/resources/wallet/usecase/increaseBalanceUsecase";

class CreditFactory {
    private creditDB;
    private CreateCreditUsecase;
    private GetAllCreditUsecase;
    private walletDB;
    constructor() {
        this.creditDB = new CreditRepository()
        this.walletDB = new WalletRepository()
        this.CreateCreditUsecase = 
        new CreateCreditUsecase(this.creditDB, this.walletDB, new IncreaseBalanceUsecase(this.walletDB, this.walletDB))
        this.GetAllCreditUsecase = new GetAllCreditUsecase(this.walletDB, this.creditDB)
    }

    async create(credit_transaction_payload: CreateCreditInterface.Request): Promise<CreateCreditInterface.Response> {
        try {
            const credit_tx = this.CreateCreditUsecase.execute(credit_transaction_payload)
            return credit_tx
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAll (user_id: GetAllCreditInterface.Request): Promise<GetAllCreditInterface.Response | Error> {
        try {
            const credit_txs = await this.GetAllCreditUsecase.execute(user_id)

            return credit_txs
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

const creditFactory = new CreditFactory()

export default creditFactory

