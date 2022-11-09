import { describe, expect, it, jest } from '@jest/globals'
import IncreaseBalanceUsecase from '../../../src/resources/wallet/usecase/increaseBalanceUsecase'
import { UpdateBalanceRepoStub, GetBalanceRepoStub } from '../repositories'

type SystemUnderTest = {
    sut: IncreaseBalanceUsecase,
    UpdateBalanceRepoStub: UpdateBalanceRepoStub,
    GetBalanceRepoStub: GetBalanceRepoStub
}

const makeSut = (): SystemUnderTest => {
  const getBalanceRepoStub = new GetBalanceRepoStub()
  const updateBalanceRepoStub = new UpdateBalanceRepoStub()
  return {
    sut: new IncreaseBalanceUsecase(getBalanceRepoStub, updateBalanceRepoStub),
    UpdateBalanceRepoStub: updateBalanceRepoStub,
    GetBalanceRepoStub: getBalanceRepoStub
  }
}

describe('Should increase value balance', () => {
  it('should call getBalance with correct data', async () => {
    const { sut, GetBalanceRepoStub } = makeSut()
    const createPostSpy = jest.spyOn(GetBalanceRepoStub, 'getBalance')
    await sut.execute({ credit_wallet: 'kadf', amount: 9 })
    expect(createPostSpy).toHaveBeenCalledWith('kadf')
  })
})
