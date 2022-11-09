import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateCreditRepository } from "../interfaces/repository/createCreditRepository";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { CreateCreditInterface } from "../interfaces/createCreditInterface";
import { Credit } from "../creditInterface";
import IncreaseBalanceUsecase from "@/resources/wallet/usecase/increaseBalanceUsecase";

export default class CreateCreditUsecase implements CreateCreditInterface {
    constructor(
        private readonly createCreditRepository: CreateCreditRepository,
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly increaseBalanceUsecase: IncreaseBalanceUsecase
    ){}

    async execute(credit_transaction_payload: CreateCreditInterface.Request): Promise<CreateCreditInterface.Response> {
        try {
            //get wallet id of the user
            const credit_wallet = await this.getAccountNoRepository.getAccountNo(credit_transaction_payload.user_id)

            const transaction: Omit<Credit, "id"> = {
                date: new Date(),
                transaction_type: 'credit',
                reference_id: `${Date.now() + credit_transaction_payload.user_id.split("-")[4]}`,
                amount: credit_transaction_payload.amount,
                credit_wallet: (credit_wallet as string), 
            }
            const creditTx = await this.createCreditRepository.createCredit(transaction)
            this.increaseBalanceUsecase.execute({amount: (creditTx as Credit).amount, credit_wallet:(credit_wallet as string)})
            return (creditTx as Credit)
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}