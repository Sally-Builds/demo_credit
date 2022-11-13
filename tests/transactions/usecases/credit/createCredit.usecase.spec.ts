import { describe, expect, it, jest } from '@jest/globals'
import HttpException from '../../../../src/utils/exceptions/httpExceptions'
import CreateCreditUsecase from '../../../../src/resources/transactions/credit/usecase/createCreditUsecase'
import { CreateCreditRepoStub } from '../../repositories/credit.repository'
import { GetAccountNoRepoStub, GetBalanceRepoStub, UpdateBalanceRepoStub } from '../../../wallet/repositories/wallet.repository'
import IncreaseBalanceUsecase from '../../../../src/resources/wallet/usecase/increaseBalanceUsecase'

type sut = {
  sut: CreateCreditUsecase,
  createCreditRepositoryStub: CreateCreditRepoStub
  getAccountNoRepositoryStub: GetAccountNoRepoStub
  increaseBalanceUsecase: IncreaseBalanceUsecase
}

const makeSut = (): sut => {
  const createCreditRepositoryStub = new CreateCreditRepoStub()
  const getAccountNoRepositoryStub = new GetAccountNoRepoStub()
  const increaseBalanceUsecase = new IncreaseBalanceUsecase(new GetBalanceRepoStub(), new UpdateBalanceRepoStub())
  return {
    sut: new CreateCreditUsecase(createCreditRepositoryStub, getAccountNoRepositoryStub, increaseBalanceUsecase),
    createCreditRepositoryStub,
    getAccountNoRepositoryStub,
    increaseBalanceUsecase
  }
}

describe('Credit Wallet Usecase', () => {
  it('should call getAccountNo function', async () => {
    const { sut, getAccountNoRepositoryStub } = makeSut()
    const getAccountNoRepoSpy = jest.spyOn(getAccountNoRepositoryStub, 'getAccountNo')
    await sut.execute({ user_id: '1-js-sh-sjf-jsk', amount: 900 })
    expect(await getAccountNoRepoSpy).toHaveBeenCalled()
  })

  it('should call create credit function', async () => {
    const { sut, createCreditRepositoryStub } = makeSut()
    const createCreditRepoStubSpy = jest.spyOn(createCreditRepositoryStub, 'createCredit')
    await sut.execute({ user_id: '1-js-sh-sjf-jsk', amount: 900 })
    expect(await createCreditRepoStubSpy).toHaveBeenCalled()
  })

  it('should call Increase balance usecase execute function', async () => {
    const { sut, increaseBalanceUsecase } = makeSut()
    const increaseBalanceUsecaseSpy = jest.spyOn(increaseBalanceUsecase, 'execute')
    await sut.execute({ user_id: '1-js-sh-sjf-jsk', amount: 900 })
    expect(await increaseBalanceUsecaseSpy).toHaveBeenCalled()
  })

  it('should throw an error', async () => {
    const { sut } = makeSut()
    expect(async () => await sut.execute({ user_id: '1-js-sh-sjf-js', amount: 900 }))
      .rejects.toThrow(new HttpException('Oops!!! something went wrong', 500))
  })
})
