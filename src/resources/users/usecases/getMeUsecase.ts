import { GetMeInterface } from "../interfaces/getMeInterface";
import { GetAccountNoRepository } from "@/resources/wallet/interfaces/repository/getAccountNoRepository";
import { GetWalletRepository } from "@/resources/wallet/interfaces/repository/getWalletRepository";
import HttpException from "@/utils/exceptions/httpExceptions";


export default class GetMeUsecase implements GetMeInterface {
    constructor(
        private readonly getAccountNoRepository: GetAccountNoRepository,
        private readonly getWalletRepository: GetWalletRepository,
    ){}

    async execute(user_id: string): Promise<GetMeInterface.Response> {
        try {
            const account_no = await this.getAccountNoRepository.getAccountNo(user_id)
            const wallet = await this.getWalletRepository.getWallet((account_no as string))
            return wallet
        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
    
}