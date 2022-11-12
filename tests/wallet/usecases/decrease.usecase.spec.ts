import { describe, expect, it, jest, beforeEach } from '@jest/globals'
import DecreaseBalanceUsecase from '../../../src/resources/wallet/usecase/decreaseBalanceUsecase'
import WalletRepository from '../../../src/resources/wallet/repository/walletRepository'
import HttpException from '../../../src/utils/exceptions/httpExceptions'

describe('decrease wallet balance', () => {
  const walletRepo = new WalletRepository()
  const increase = new DecreaseBalanceUsecase(walletRepo, walletRepo)
  const usecasePayload = { debit_wallet: '1234567890', amount: 200 }

  beforeEach(() => {
    walletRepo.getBalance = jest.fn((id:string) => Promise.resolve(500))
    walletRepo.updateBalance = jest.fn(val => Promise.resolve())
  })

  describe('get balance repository', () => {
    beforeEach(async () => {
      await increase.execute(usecasePayload)
    })

    it('should call get balance repository with correct argument', async () => {
      expect(walletRepo.getBalance).toBeCalledWith(usecasePayload.debit_wallet)
    })

    it('should return 100', async () => {
      const balance = jest.spyOn(walletRepo, 'getBalance')

      expect(await balance.mock.results[0].value).toBe(500)
    })

    it('should throw an exception if wallet_id not found', async () => {
      walletRepo.getBalance = jest.fn((id) => Promise.reject(new HttpException('Oops!!! something went wrong', 500)))

      expect(walletRepo.getBalance).rejects.toThrow(new HttpException('Oops!!! something went wrong', 500))
    })
  })

  describe('update balance repository', () => {
    beforeEach(async () => {
      await increase.execute(usecasePayload)
    })

    it('should call get balance repository with correct argument', async () => {
      const data = jest.spyOn(walletRepo, 'getBalance')
      const new_balance = await data.mock.results[0].value
      expect(walletRepo.updateBalance).toBeCalledWith({ account_no: usecasePayload.debit_wallet, new_balance: (new_balance as number) - usecasePayload.amount })
    })
  })
})
