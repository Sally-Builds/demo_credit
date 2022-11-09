import HttpException from "@/utils/exceptions/httpExceptions";
import CreateTransferUsecase from "../usecase/createTranferUsecase";
import GetAllTransferUsecase from "../usecase/getAllTransferUsecase";
import { GetAllTransferInterface } from "../interface/getAllTransferInterface";
import { CreateTransferInterface } from "../interface/createTransferInterface";
import WalletRepository from "@/resources/wallet/repository/walletRepository";
import TransferRepository from "../repository/transferRepository";
import IncreaseBalanceUsecase from "@/resources/wallet/usecase/increaseBalanceUsecase";
import DecreaseBalanceUsecase from "@/resources/wallet/usecase/decreaseBalanceUsecase";

class TransferFactory {
    private transferDB;
    private CreateTransferUsecase;
    private GetAllTransferUsecase;
    private walletDB;
    constructor() {
        this.transferDB = new TransferRepository()
        this.walletDB = new WalletRepository()
        this.CreateTransferUsecase = 
        new CreateTransferUsecase
            (
            this.transferDB, 
            this.walletDB,
            this.walletDB,
            this.walletDB,
            new IncreaseBalanceUsecase(this.walletDB, this.walletDB),
            new DecreaseBalanceUsecase(this.walletDB, this.walletDB)
        )
        this.GetAllTransferUsecase = new GetAllTransferUsecase(this.walletDB, this.transferDB)
    }

    async create(transfer_transaction_payload: CreateTransferInterface.Request): Promise<CreateTransferInterface.Response> {
        try {
            const transfer_tx = this.CreateTransferUsecase.execute(transfer_transaction_payload)
            return transfer_tx
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

    async getAll (user_id: GetAllTransferInterface.Request): Promise<GetAllTransferInterface.Response | Error> {
        try {
            const transfer_txs = await this.GetAllTransferUsecase.execute(user_id)

            return transfer_txs
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

const transferFactory = new TransferFactory()

export default transferFactory

