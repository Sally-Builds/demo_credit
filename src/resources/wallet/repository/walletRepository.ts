import db from '@/utils/dbConfig/dbConnection'
import HttpException from '@/utils/exceptions/httpExceptions'
import { CreateWalletRepository } from '../interfaces/repository/createWalletRepository'
import { UpdateBalanceRepository } from '../interfaces/repository/updateBalanceRepository'
import { GetBalanceRepository } from '../interfaces/repository/getBalanceRepository'
import { GetAccountNoRepository } from '../interfaces/repository/getAccountNoRepository'
import { GetWalletRepository } from '../interfaces/repository/getWalletRepository'

export default class WalletRepository implements
        CreateWalletRepository,
        UpdateBalanceRepository,
        GetBalanceRepository,
        GetWalletRepository,
        GetAccountNoRepository {
  async createWallet (walletCred: CreateWalletRepository.Request): Promise<CreateWalletRepository.Response> {
    try {
      await db('wallets').insert(walletCred)
    } catch (error) {
      console.log(error)
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }

  async getBalance (account_no: string): Promise<GetBalanceRepository.Response> {
    try {
      const data = await db('wallets').where('account_no', account_no).select('balance')
      return data[0].balance
    } catch (error:any) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }

  async updateBalance (account_no_and_new_balance: UpdateBalanceRepository.Request): Promise<UpdateBalanceRepository.Response> {
    try {
      const data = await db('wallets')
        .where({ account_no: account_no_and_new_balance.account_no })
        .update({ balance: account_no_and_new_balance.new_balance })
    } catch (error:any) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }

  async getWallet (account_no: string): Promise<GetWalletRepository.Response> {
    try {
      const result = await db('wallets').where('account_no', account_no).select('*')
      return result[0]
    } catch (error:any) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getAccountNo (user_id: string): Promise<GetAccountNoRepository.Response> {
    try {
      const wallet_id = await db('wallets').where('user_id', user_id).select('account_no')
      return wallet_id[0].account_no
    } catch (error:any) {
      console.log(error)
      throw new Error(error)
    }
  }
}
