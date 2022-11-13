import { describe, expect, it, jest } from '@jest/globals'
// import HttpException from '../../../../src/utils/exceptions/httpExceptions'
import GetAllCreditUsecase from '../../../../src/resources/transactions/credit/usecase/getAllCreditUsecase'
import { GetAllCreditRepoStub } from '../../repositories/credit.repository'
import { GetAccountNoRepoStub } from '../../../wallet/repositories/wallet.repository'

type sut = {
  sut: GetAllCreditUsecase,
  getAccountNoRepositoryStub: GetAccountNoRepoStub
  getAllCreditRepoStub: GetAllCreditRepoStub
}

const makeSut = (): sut => {
  const getAllCreditRepoStub = new GetAllCreditRepoStub()
  const getAccountNoRepositoryStub = new GetAccountNoRepoStub()
  return {
    sut: new GetAllCreditUsecase(getAccountNoRepositoryStub, getAllCreditRepoStub),
    getAllCreditRepoStub,
    getAccountNoRepositoryStub
  }
}

describe('Get all credit transactions', () => {
  it('should call getAccountNo function', async () => {
    const { sut, getAccountNoRepositoryStub } = makeSut()
    const getAccountNoRepoSpy = jest.spyOn(getAccountNoRepositoryStub, 'getAccountNo')
    await sut.execute('1-js-sh-sjf-jsk')
    expect(await getAccountNoRepoSpy).toHaveBeenCalled()
  })

  it('should call getAll function', async () => {
    const { sut, getAllCreditRepoStub } = makeSut()
    const getAllCreditRepoStubSpy = jest.spyOn(getAllCreditRepoStub, 'getAll')
    await sut.execute('1-js-sh-sjf-jsk')
    expect(await getAllCreditRepoStubSpy).toHaveBeenCalled()
  })
})
