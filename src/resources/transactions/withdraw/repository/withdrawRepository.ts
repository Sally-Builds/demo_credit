import db from "@/utils/dbConfig/dbConnection";
import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateWithdrawRepository } from "../interfaces/repository/createWithdrawRepository";
import { GetAllWithdrawRepository } from "../interfaces/repository/getAllWithdrawRepository";
import Withdraw from "../withdrawInterface";

export default class WithdrawRepository implements 
    CreateWithdrawRepository,
    GetAllWithdrawRepository
 {
  async createWithdraw(debit_transaction_payload: CreateWithdrawRepository.Request): Promise<CreateWithdrawRepository.Response> {
      try {
        await db('transactions').insert(debit_transaction_payload)
        const tx = await this.getTx(debit_transaction_payload.reference_id)
        return (tx as Withdraw)
      } catch (error) {
        throw new HttpException('Oops!!! something went wrong', 500)
      }
  }

  async getAll(account_no: string): Promise<GetAllWithdrawRepository.Response> {
      try {
        const txs = await db('transactions').where({debit_wallet:account_no, transaction_type: 'withdraw'})
            return txs
      } catch (error) {
        throw new HttpException('Oops!!! something went wrong', 500)
        
      }
  }

  async getTx(reference_id: string): Promise<Withdraw | void> {
    try {
        const tx = await db('transactions').where('reference_id', reference_id)
        return tx[0]
    } catch (error:any) {
        throw new Error(error)
    }
}

}