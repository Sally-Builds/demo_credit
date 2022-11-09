import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateWithdrawRepository } from "../interfaces/repository/createWithdrawRepository";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { CreateWithdrawInterface } from "../interfaces/createWithdrawInterface";
import Withdraw from "../withdrawInterface";
import DecreaseBalanceUsecase from "@/resources/wallet/usecase/decreaseBalanceUsecase";

export default class CreateWithdrawUsecase implements CreateWithdrawInterface {
    constructor(
        private readonly createWithdrawRepository: CreateWithdrawRepository,
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly decreaseBalanceUsecase: DecreaseBalanceUsecase
    ){}

    async execute(debit_transaction_payload: CreateWithdrawInterface.Request): Promise<CreateWithdrawInterface.Response> {
        try {
            //get wallet id of the user
            const debit_wallet = await this.getAccountNoRepository.getAccountNo(debit_transaction_payload.user_id)

            const transaction: Omit<Withdraw, "id"> = {
                date: new Date(),
                transaction_type: 'withdraw',
                reference_id: `${Date.now() + debit_transaction_payload.user_id.split("-")[4]}`,
                amount: debit_transaction_payload.amount,
                debit_wallet: (debit_wallet as string), 
                bank_name: debit_transaction_payload.bank_name,
               bank_account_no: debit_transaction_payload.bank_account_no,
            }
            const credit_tx = await this.createWithdrawRepository.createWithdraw(transaction)
            this.decreaseBalanceUsecase.execute({amount: (credit_tx as Withdraw).amount, debit_wallet:(debit_wallet as string)})
            return (credit_tx as Withdraw)
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}