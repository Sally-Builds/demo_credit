import { GetBalanceRepository } from '../../src/resources/wallet/interfaces/repository/getBalanceRepository'
import { UpdateBalanceRepository } from '../../src/resources/wallet/interfaces/repository/updateBalanceRepository'
import HttpException from '../../src/utils/exceptions/httpExceptions'
import fakeWallet from './walletFakeData'

export class GetBalanceRepoStub implements GetBalanceRepository {
  async getBalance (account_no: string): Promise<GetBalanceRepository.Response> {
    try {
      const balance = fakeWallet.balance
      console.log(`balance fetched with value ${balance}`)
      return (balance as number)
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}

export class UpdateBalanceRepoStub implements UpdateBalanceRepository {
  async updateBalance (account_no_and_new_balance: UpdateBalanceRepository.Request): Promise<UpdateBalanceRepository.Response> {
    try {
      fakeWallet.balance = account_no_and_new_balance.new_balance
      console.log(`balance updated with new value ${fakeWallet.balance}`)
      return
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}
