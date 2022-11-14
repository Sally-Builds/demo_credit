import { describe, expect, it, jest, beforeEach } from '@jest/globals'
import IncreaseBalanceUsecase from '../../../src/resources/wallet/usecase/increaseBalanceUsecase'
import WalletRepository from '../../../src/resources/wallet/repository/walletRepository'
import HttpException from '../../../src/utils/exceptions/httpExceptions'

describe('increase wallet balance', () => {
  const walletRepo = new WalletRepository()
  const increase = new IncreaseBalanceUsecase(walletRepo, walletRepo)
  const usecasePayload = { credit_wallet: '1234567890', amount: 200 }

  beforeEach(() => {
    jest.useFakeTimers()
    walletRepo.getBalance = jest.fn((id:string) => Promise.resolve(100))
    walletRepo.updateBalance = jest.fn(val => Promise.resolve())
  })

  describe('get balance repository', () => {
    beforeEach(async () => {
      await increase.execute(usecasePayload)
    })

    it('should call get balance repository with correct argument', async () => {
      expect(walletRepo.getBalance).toBeCalledWith(usecasePayload.credit_wallet)
    })

    it('should return 100', async () => {
      const balance = jest.spyOn(walletRepo, 'getBalance')

      expect(await balance.mock.results[0].value).toBe(100)
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
      expect(walletRepo.updateBalance).toBeCalledWith({ account_no: usecasePayload.credit_wallet, new_balance: (new_balance as number) + usecasePayload.amount })
    })
  })
})
