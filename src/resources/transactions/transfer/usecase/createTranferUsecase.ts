import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateTransferRepository } from "../interface/repository/createTransferRepository";
import { CreateTransferInterface } from "../interface/createTransferInterface";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { GetWalletRepository } from "@/resources/wallet/interfaces/repository/getWalletRepository";
import { GetBalanceRepository } from "@/resources/wallet/interfaces/repository/getBalanceRepository";
import IncreaseBalanceUsecase from "@/resources/wallet/usecase/increaseBalanceUsecase";
import DecreaseBalanceUsecase from "@/resources/wallet/usecase/decreaseBalanceUsecase";
import Transfer from "../transferInterface";

export default class CreateTransferUsecase implements CreateTransferInterface {
    constructor(
        private readonly createTransferRepository: CreateTransferRepository,
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly getWalletRepository: GetWalletRepository,
        private readonly getBalanceRepository: GetBalanceRepository,
        private readonly increaseBalanceUsecase: IncreaseBalanceUsecase,
        private readonly decreaseBalanceUsecase: DecreaseBalanceUsecase
    ){}

    async execute(transfer_transaction_payload: CreateTransferInterface.Request): Promise<CreateTransferInterface.Response> {
        try {
            //get account no of the user
            const debit_wallet = await this.getAccountNoRepository.getAccountNo(transfer_transaction_payload.user_id)

            //check if debit account no exist
            if(!debit_wallet) {
                throw new HttpException("Something went wrong", 500)
            }

            //check if credit acc no exist
            if(!(await this.getWalletRepository.getWallet(transfer_transaction_payload.credit_wallet))) {
                throw new HttpException("Account number does not exist", 400)
            }

            //prevent user from crediting his own account
            if(transfer_transaction_payload.credit_wallet == debit_wallet) {
                throw new HttpException("You cannot transfer to your account", 400)
            }

            //check if balance is sufficient
            const previousBalance = await this.getBalanceRepository.getBalance((debit_wallet as string))
            if(transfer_transaction_payload.amount > previousBalance) {
                throw new HttpException("Insufficient funds!", 400)
            }

            const transaction: Omit<Transfer, "id"> = {
                date: new Date(),
                transaction_type: 'transfer',
                reference_id: `${Date.now() + transfer_transaction_payload.user_id.split("-")[4]}`,
                amount: transfer_transaction_payload.amount,
                debit_wallet: (debit_wallet as string), 
                credit_wallet: `${transfer_transaction_payload.credit_wallet}`,
            }
            const transfer_tx = await this.createTransferRepository.createTransfer(transaction)
            this.increaseBalanceUsecase.execute({amount: (transfer_tx as Transfer).amount, credit_wallet:transfer_transaction_payload.credit_wallet})
            this.decreaseBalanceUsecase.execute({amount: (transfer_tx as Transfer).amount, debit_wallet:(debit_wallet as string)})
            return (transfer_tx as Transfer)
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}