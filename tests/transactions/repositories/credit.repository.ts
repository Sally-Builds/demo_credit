import HttpException from '../../../src/utils/exceptions/httpExceptions'
import { CreateCreditRepository } from '../../../src/resources/transactions/credit/interfaces/repository/createCreditRepository'
import { GetAllCreditRepository } from '../../../src/resources/transactions/credit/interfaces/repository/getAllCreditRepository'
import { Credit } from '../../../src/resources/transactions/credit/creditInterface'
import { transactionsDB } from '../db/transactionMockDB'

export class CreateCreditRepoStub implements CreateCreditRepository {
  async createCredit (credit_transaction_payload: CreateCreditRepository.Request): Promise<CreateCreditRepository.Response> {
    try {
      transactionsDB.push(credit_transaction_payload)
      const tx = await this.getTx(credit_transaction_payload.reference_id)
      return (tx as Credit)
    } catch (error) {
      // throw new HttpException('Oops!!! something went wrong', 500)
    }
  }

  async getTx (reference_id: string): Promise<Credit | void> {
    try {
      const tx = await transactionsDB.find(e => e.reference_id === reference_id)
      if (!tx) throw new HttpException('Oops!!! something went wrong', 500)
      return tx
    } catch (error:any) {
      // throw new HttpException('Oops!!! something went wrong', 500)
    }
  }
}

export class GetAllCreditRepoStub implements GetAllCreditRepository {
  async getAll (account_no: string): Promise<GetAllCreditRepository.Response> {
    try {
      const txs = await transactionsDB.filter(e => e.credit_wallet === account_no && e.transaction_type === 'credit')
      return txs
    } catch (error) {
      throw new HttpException('Oops!!! something went wrong', 500)
    }
  }
}
