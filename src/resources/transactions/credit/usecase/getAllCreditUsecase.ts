import HttpException from "@/utils/exceptions/httpExceptions";
import { GetAllCreditRepository } from "../interfaces/repository/getAllCreditRepository";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { GetAllCreditInterface } from "../interfaces/getAllCreditInterface";
import { Credit } from "../creditInterface";

export default class GetAllCreditUsecase implements GetAllCreditInterface {
    constructor(
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly GetAllCreditRepository: GetAllCreditRepository,
    ){}

    async execute(user_id: string): Promise<GetAllCreditInterface.Response> {
        try {
            //get wallet account no
            const account_no = await this.getAccountNoRepository.getAccountNo(user_id)

            // query of a credit with account no
            const creditTxs = await this.GetAllCreditRepository.getAll((account_no as string))

            //return result
            return (creditTxs as Credit[])
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}