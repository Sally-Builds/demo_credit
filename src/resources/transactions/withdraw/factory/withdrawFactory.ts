import HttpException from "@/utils/exceptions/httpExceptions";
import CreateWithdrawUsecase from "../usecase/createWithdrawUsecase";
import GetAllWithdrawUsecase from "../usecase/getAllWithdrawUsecase";
import { GetAllWithdrawInterface } from "../interfaces/getAllWithdrawInterface";
import { CreateWithdrawInterface } from "../interfaces/createWithdrawInterface";
import WalletRepository from "@/resources/wallet/repository/walletRepository";
import WithdrawRepository from "../repository/withdrawRepository";
import DecreaseBalanceUsecase from "@/resources/wallet/usecase/decreaseBalanceUsecase";

class WithdrawFactory {
    private debitDB;
    private CreateWalletUsecase;
    private GetAllWithdrawUsecase;
    private walletDB;
    constructor() {
        this.debitDB = new WithdrawRepository()
        this.walletDB = new WalletRepository()
        this.CreateWalletUsecase = 
        new CreateWithdrawUsecase(this.debitDB, this.walletDB, new DecreaseBalanceUsecase(this.walletDB, this.walletDB))
        this.GetAllWithdrawUsecase = new GetAllWithdrawUsecase(this.walletDB, this.debitDB)
    }

    async create(debit_transaction_payload: CreateWithdrawInterface.Request): Promise<CreateWithdrawInterface.Response> {
        try {
            const debit_tx = this.CreateWalletUsecase.execute(debit_transaction_payload)
            return debit_tx
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAll (user_id: GetAllWithdrawInterface.Request): Promise<GetAllWithdrawInterface.Response | Error> {
        try {
            const debit_txs = await this.GetAllWithdrawUsecase.execute(user_id)

            return debit_txs
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

const withdrawFactory = new WithdrawFactory()

export default withdrawFactory

