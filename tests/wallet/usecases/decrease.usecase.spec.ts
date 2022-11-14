import { describe, expect, it, jest } from '@jest/globals'
import DecreaseBalanceUsecase from '../../../src/resources/wallet/usecase/decreaseBalanceUsecase'
import { UpdateBalanceRepoStub, GetBalanceRepoStub } from '../repositories/wallet.repository'

type sut = {
  sut: DecreaseBalanceUsecase,
  updateBalanceRepoStub: UpdateBalanceRepoStub,
  getBalanceRepoStub: GetBalanceRepoStub,
}

const makeSut = (): sut => {
  const updateBalanceRepoStub = new UpdateBalanceRepoStub()
  const getBalanceRepoStub = new GetBalanceRepoStub()
  return {
    sut: new DecreaseBalanceUsecase(getBalanceRepoStub, updateBalanceRepoStub),
    updateBalanceRepoStub,
    getBalanceRepoStub
  }
}

describe('decrease wallet balance', () => {
  const usecasePayload = { debit_wallet: '1234506789', amount: 200 }

  describe('get balance repository', () => {
    it('should return 100', async () => {
      const { sut, getBalanceRepoStub } = makeSut()
      const balance = jest.spyOn(getBalanceRepoStub, 'getBalance')
      await sut.execute(usecasePayload)
      expect(await balance.mock.results[0].value).toBe(1200)
    })
    it('should call get balance repository with correct argument', async () => {
      const { sut, getBalanceRepoStub } = makeSut()
      const getBalance = jest.spyOn(getBalanceRepoStub, 'getBalance')
      await sut.execute(usecasePayload)
      expect(await getBalance).toHaveBeenCalledWith(usecasePayload.debit_wallet)
    })
  })

  // describe('update balance repository', () => {
  // })
})
