import { describe, expect, it, jest, beforeEach } from '@jest/globals'
import WalletRepository from '../../../src/resources/wallet/repository/walletRepository'
import CreateWalletUsecase from '../../../src/resources/wallet/usecase/createWalletUsecase'
import Wallet from '../../../src/resources/wallet/walletInterface'

describe('Create wallet usecase', () => {
  const walletRepo = new WalletRepository()
  const createWallet = new CreateWalletUsecase(walletRepo)
  beforeEach(() => {
    walletRepo.createWallet = jest.fn((walletCred: Wallet) => Promise.resolve())
  })

  it('should generate Account number of wallet', async () => {
    const generateAccountId = jest.spyOn(CreateWalletUsecase, 'generateAccountId')
    await createWallet.execute('user_id')

    expect(generateAccountId).toHaveBeenCalled()
  })

  it('should call create wallet repository with the correct argument', async () => {
    const generateAccountId = jest.spyOn(CreateWalletUsecase, 'generateAccountId')
    await createWallet.execute('user_id')

    const account_no = generateAccountId.mock.results[0].value
    const val:Omit<Wallet, 'id'> = {
      user_id: 'user_id',
      balance: 0,
      account_no: (account_no as string)
    }

    expect(walletRepo.createWallet).toHaveBeenCalledWith(expect.objectContaining(val))
  })
})
