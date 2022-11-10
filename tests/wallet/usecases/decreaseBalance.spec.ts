import { describe, expect, it, jest, afterEach } from '@jest/globals'
import DecreaseBalanceUsecase from '../../../src/resources/wallet/usecase/decreaseBalanceUsecase'
import { UpdateBalanceRepoStub, GetBalanceRepoStub } from '../repositories'
import walletMockDB from '../mockData/walletMockDB'

type SystemUnderTest = {
    sut: DecreaseBalanceUsecase,
    UpdateBalanceRepoStub: UpdateBalanceRepoStub,
    GetBalanceRepoStub: GetBalanceRepoStub
}

const makeSut = (): SystemUnderTest => {
  const getBalanceRepoStub = new GetBalanceRepoStub()
  const updateBalanceRepoStub = new UpdateBalanceRepoStub()
  return {
    sut: new DecreaseBalanceUsecase(getBalanceRepoStub, updateBalanceRepoStub),
    UpdateBalanceRepoStub: updateBalanceRepoStub,
    GetBalanceRepoStub: getBalanceRepoStub
  }
}

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks()
})

describe('Should decrease Wallet Balance', () => {
  it('should call getBalance repository with correct data', async () => {
    const { sut, GetBalanceRepoStub } = makeSut()
    const getBalanceRepoSpy = jest.spyOn(GetBalanceRepoStub, 'getBalance')
    await sut.execute({ debit_wallet: walletMockDB[0].account_no, amount: 10 })
    expect(getBalanceRepoSpy).toHaveBeenCalledWith(walletMockDB[0].account_no)
  })

  it('getBalance repository should return the correct value', async () => {
    const { sut, GetBalanceRepoStub } = makeSut()
    const getBalanceRepoSpy = jest.spyOn(GetBalanceRepoStub, 'getBalance')
    await sut.execute({ debit_wallet: walletMockDB[0].account_no, amount: 10 })
    expect(await getBalanceRepoSpy.mock.results[0].value).toEqual(walletMockDB[0].balance + 10)
  })
})
