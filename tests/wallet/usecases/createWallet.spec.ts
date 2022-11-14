import { describe, expect, it, jest } from '@jest/globals'
import { CreateWalletRepoStub } from '../repositories/wallet.repository'
import CreateWalletUsecase from '../../../src/resources/wallet/usecase/createWalletUsecase'
import Wallet from '../../../src/resources/wallet/walletInterface'

type sut = {
  sut: CreateWalletUsecase,
  createWalletRepoStub: CreateWalletRepoStub
}

const makeSut = (): sut => {
  const createWalletRepoStub = new CreateWalletRepoStub()
  return {
    sut: new CreateWalletUsecase(createWalletRepoStub),
    createWalletRepoStub
  }
}

describe('Create wallet usecase', () => {
  it('should generate Account number of wallet', async () => {
    const { sut } = makeSut()
    const generateAccountId = jest.spyOn(CreateWalletUsecase, 'generateAccountId')
    await sut.execute('user_id')

    expect(generateAccountId).toHaveBeenCalled()
  })

  it('should call create wallet repository with the correct argument', async () => {
    const { sut, createWalletRepoStub } = makeSut()
    const createWallet = jest.spyOn(createWalletRepoStub, 'createWallet')
    const generateAccountId = jest.spyOn(CreateWalletUsecase, 'generateAccountId')
    await sut.execute('user_id')

    const account_no = await generateAccountId.mock.results[0].value
    const val:Omit<Wallet, 'id'> = {
      user_id: 'user_id',
      balance: 0,
      account_no: (account_no as string)
    }

    expect(await createWallet).toHaveBeenCalledWith(expect.objectContaining(val))
  })
})
