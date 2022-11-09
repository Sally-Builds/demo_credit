import { CreateWalletRepository } from '../interfaces/repository/createWalletRepository'
import { CreateWalletInterface } from '../interfaces/createWalletInterface'
import HttpException from '@/utils/exceptions/httpExceptions'

export default class CreateWalletUsecase implements CreateWalletInterface {
  constructor (
        private readonly createWalletRepository: CreateWalletRepository
  ) {}

  static generateAccountId (): string {
    return `${Math.floor(1000000000 + Math.random() * 9000000000)}`
  }

  async execute (user_id: string): Promise<CreateWalletInterface.Response> {
    try {
      const walletCred = {
        balance: 0,
        user_id,
        account_no: CreateWalletUsecase.generateAccountId()
      }

      this.createWalletRepository.createWallet(walletCred)
    } catch (error:any) {
      throw new HttpException(error.message, error.statusCode)
    }
  }
}
