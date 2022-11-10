/* eslint-disable eqeqeq */
import { GetBalanceRepository } from '../../src/resources/wallet/interfaces/repository/getBalanceRepository'
import { UpdateBalanceRepository } from '../../src/resources/wallet/interfaces/repository/updateBalanceRepository'
import Wallet from '../../src/resources/wallet/walletInterface'
import HttpException from '../../src/utils/exceptions/httpExceptions'
import walletMockDB from './mockData/walletMockDB'

export class GetBalanceRepoStub implements GetBalanceRepository {
  async getBalance (account_no: string): Promise<GetBalanceRepository.Response> {
    try {
      const wallet = walletMockDB.find((e:Wallet) => e.account_no == account_no)
      if (!wallet) {
        throw new HttpException('something went wrong', 500)
      }
      console.log(`balance fetched with value ${wallet.balance}`)
      return ((wallet.balance) as number)
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}

export class UpdateBalanceRepoStub implements UpdateBalanceRepository {
  async updateBalance (account_no_and_new_balance: UpdateBalanceRepository.Request): Promise<UpdateBalanceRepository.Response> {
    const wallet = walletMockDB.find((e:Wallet) => e.account_no == account_no_and_new_balance.account_no)
    if (typeof wallet == 'object') {
      wallet.balance = account_no_and_new_balance.new_balance
    }
  }
}
