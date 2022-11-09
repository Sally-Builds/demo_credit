/* eslint-disable no-useless-constructor */
import { GetBalanceRepository } from '../interfaces/repository/getBalanceRepository'
import { UpdateBalanceRepository } from '../interfaces/repository/updateBalanceRepository'
import { IncreaseBalanceInterface } from '../interfaces/increaseBalanceInterface'
// import HttpException from '../../../../src/utils/exceptions/httpExceptions'
import HttpException from '@/utils/exceptions/httpExceptions'

export default class IncreaseBalanceUsecase implements IncreaseBalanceInterface {
  constructor (
        private readonly getBalanceRepository: GetBalanceRepository,
        private readonly UpdateBalanceRepository: UpdateBalanceRepository
  ) {}

  async execute (data: IncreaseBalanceInterface.Request): Promise<IncreaseBalanceInterface.Response> {
    try {
      const previousBalance = await this.getBalanceRepository.getBalance(data.credit_wallet)

      const new_balance = (previousBalance as number) + data.amount

      await this.UpdateBalanceRepository.updateBalance({ account_no: data.credit_wallet, new_balance })
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}
