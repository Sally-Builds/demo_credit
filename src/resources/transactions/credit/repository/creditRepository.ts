import db from "@/utils/dbConfig/dbConnection";
import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateCreditRepository } from "../interfaces/repository/createCreditRepository";
import { GetAllCreditRepository } from "../interfaces/repository/getAllCreditRepository";
import { Credit } from "../creditInterface";

export default class CreditRepository implements 
        CreateCreditRepository,
        GetAllCreditRepository
 {
  async createCredit(credit_transaction_payload: CreateCreditRepository.Request): Promise<CreateCreditRepository.Response> {
      try {
        await db('transactions').insert(credit_transaction_payload)
        const tx = await this.getTx(credit_transaction_payload.reference_id)
        return (tx as Credit)
      } catch (error) {
        throw new HttpException('Oops!!! something went wrong', 500)
      }
  }

  async getAll(account_no: string): Promise<GetAllCreditRepository.Response> {
      try {
        const txs = await db('transactions').where({credit_wallet:account_no, transaction_type: 'credit'})
            return txs
      } catch (error) {
        throw new HttpException('Oops!!! something went wrong', 500)
        
      }
  }

  async getTx(reference_id: string): Promise<Credit | void> {
    try {
        const tx = await db('transactions').where('reference_id', reference_id)
        return tx[0]
    } catch (error:any) {
        throw new Error(error)
    }
}

}