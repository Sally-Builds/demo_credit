import HttpException from "@/utils/exceptions/httpExceptions";
import { GetAllWithdrawRepository } from "../interfaces/repository/getAllWithdrawRepository";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { GetAllWithdrawInterface } from "../interfaces/getAllWithdrawInterface";
import Withdraw from "../withdrawInterface";

export default class GetAllWithdrawUsecase implements GetAllWithdrawInterface {
    constructor(
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly getAllWithdrawRepository: GetAllWithdrawRepository,
    ){}

    async execute(user_id: string): Promise<GetAllWithdrawInterface.Response> {
        try {
            //get wallet account no
            const account_no = await this.getAccountNoRepository.getAccountNo(user_id)

            // query of a credit with account no
            const debit_txs = await this.getAllWithdrawRepository.getAll((account_no as string))

            //return result
            return (debit_txs as Withdraw[])
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}