import HttpException from "@/utils/exceptions/httpExceptions";
import { GetAllTransferRepository } from "../interface/repository/getAllTransferRepository";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { GetAllTransferInterface } from "../interface/getAllTransferInterface";
import Transfer from "../transferInterface";

export default class GetAllTransferUsecase implements GetAllTransferInterface {
    constructor(
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly getAllransferRepository: GetAllTransferRepository,
    ){}

    async execute(user_id: string): Promise<GetAllTransferInterface.Response> {
        try {
            //get wallet account no
            const account_no = await this.getAccountNoRepository.getAccountNo(user_id)

            // query of a credit with account no
            const transfer_tx = await this.getAllransferRepository.getAll((account_no as string))

            //return result
            return (transfer_tx as Transfer[])
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }

}