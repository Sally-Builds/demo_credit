/* eslint-disable eqeqeq */
import { GetBalanceRepository } from '../../../src/resources/wallet/interfaces/repository/getBalanceRepository'
import { UpdateBalanceRepository } from '../../../src/resources/wallet/interfaces/repository/updateBalanceRepository'
import { GetAccountNoRepository } from '../../../src/resources/wallet/interfaces/repository/getAccountNoRepository'
import { GetWalletRepository } from '../../../src/resources/wallet/interfaces/repository/getWalletRepository'
import { CreateWalletRepository } from '../../../src/resources/wallet/interfaces/repository/createWalletRepository'
import Wallet from '../../../src/resources/wallet/walletInterface'
import HttpException from '../../../src/utils/exceptions/httpExceptions'
import walletMockDB from '../db/walletMockDB'

export class CreateWalletRepoStub implements CreateWalletRepository {
  async createWallet (walletCred: CreateWalletRepository.Request): Promise<CreateWalletRepository.Response> {
    try {
      await walletMockDB.push({ ...walletCred, id: walletMockDB.length + 1 })
    } catch (error) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }
}

export class GetWalletRepoStub implements GetWalletRepository {
  async getWallet (account_no: string): Promise<GetWalletRepository.Response> {
    try {
      const result = await walletMockDB.find(e => e.account_no === account_no)
      if (!result) throw new HttpException('Oops!!! something went wrong', 500)
      return result[0]
    } catch (error:any) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }
}

export class GetAccountNoRepoStub implements GetAccountNoRepository {
  async getAccountNo (user_id: string): Promise<GetAccountNoRepository.Response> {
    try {
      const wallet = await walletMockDB.find(e => e.user_id === user_id)
      if (!wallet) throw new HttpException('Oops!!! something went wrong', 500)

      return wallet.account_no
    } catch (error:any) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }
}

export class GetBalanceRepoStub implements GetBalanceRepository {
  async getBalance (account_no: string): Promise<GetBalanceRepository.Response> {
    try {
      const wallet = walletMockDB.find((e:Wallet) => e.account_no == account_no)
      if (!wallet) {
        throw new HttpException('something went wrong', 500)
      }
      return ((wallet.balance) as number)
    } catch (error:any) {
      // throw new HttpException(error.message, error.statusCode)
    }
  }
}

export class UpdateBalanceRepoStub implements UpdateBalanceRepository {
  async updateBalance (account_no_and_new_balance: UpdateBalanceRepository.Request): Promise<UpdateBalanceRepository.Response> {
    try {
      const wallet = walletMockDB.find((e:Wallet) => e.account_no == account_no_and_new_balance.account_no)
      if (!wallet) {
        throw new HttpException('something went wrong', 500)
      }
      wallet.balance = account_no_and_new_balance.new_balance
    } catch (error:any) {
      // throw new HttpException(error.message, error.statusCode)
    }
  }
}
