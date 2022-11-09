import { GetBalanceRepository } from "../interfaces/repository/getBalanceRepository";
import { UpdateBalanceRepository } from "../interfaces/repository/updateBalanceRepository";
import { DecreaseBalanceInterface } from "../interfaces/decreaseBalanceInterface";
import HttpException from "@/utils/exceptions/httpExceptions";


export default class DecreaseBalanceUsecase implements DecreaseBalanceInterface {
    constructor(
        private readonly getBalanceRepository: GetBalanceRepository,
        private readonly UpdateBalanceRepository: UpdateBalanceRepository
    ){}
    
    async execute(data: DecreaseBalanceInterface.Request): Promise<DecreaseBalanceInterface.Response> {
        try {
            const previousBalance = await this.getBalanceRepository.getBalance(data.debit_wallet)

            const new_balance = (previousBalance as number) - data.amount

            await this.UpdateBalanceRepository.updateBalance({account_no:data.debit_wallet, new_balance})

        } catch (error:any) {
            throw new HttpException(error.message, error.statusCode)
        }
    }
}