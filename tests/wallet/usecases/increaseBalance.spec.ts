import { describe, expect, it, jest, afterEach } from '@jest/globals'
import IncreaseBalanceUsecase from '../../../src/resources/wallet/usecase/increaseBalanceUsecase'
import { UpdateBalanceRepoStub, GetBalanceRepoStub } from '../repositories'
import walletMockDB from '../mockData/walletMockDB'
import HttpException from '../../../src/utils/exceptions/httpExceptions'

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

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks()
})

describe('Should increase Wallet Balance', () => {
  it('should call getBalance repository with correct data', async () => {
    const { sut, GetBalanceRepoStub } = makeSut()
    const getBalanceRepoSpy = jest.spyOn(GetBalanceRepoStub, 'getBalance')
    await sut.execute({ credit_wallet: walletMockDB[0].account_no, amount: 10 })
    expect(getBalanceRepoSpy).toHaveBeenCalledWith(walletMockDB[0].account_no)
  })

  it('getBalance repository should return the correct value', async () => {
    const { sut, GetBalanceRepoStub } = makeSut()
    const getBalanceRepoSpy = jest.spyOn(GetBalanceRepoStub, 'getBalance')
    await sut.execute({ credit_wallet: walletMockDB[0].account_no, amount: 10 })
    expect(await getBalanceRepoSpy.mock.results[0].value).toEqual(walletMockDB[0].balance - 10)
  })
})

describe('Increase Balance should throw an Error', () => {
  it('Get balance repository should throw an Error', async () => {
    const { sut } = makeSut()
    const val = async () => { await sut.execute({ credit_wallet: 'invalid_id', amount: 10 }) }
    await expect(val()).rejects.toThrow(new HttpException('something went wrong', 500))
  })
})
