import db from "@/utils/dbConfig/dbConnection";
import HttpException from "@/utils/exceptions/httpExceptions";
import { CreateTransferRepository } from "../interface/repository/createTransferRepository";
import { GetAllTransferRepository } from "../interface/repository/getAllTransferRepository";
import Transfer from "../transferInterface";

export default class TransferRepository implements 
        CreateTransferRepository,
        GetAllTransferRepository
 {
 
  async createTransfer(transfer_transaction_payload: CreateTransferRepository.Request): Promise<CreateTransferRepository.Response> {
    try {
      await db('transactions').insert(transfer_transaction_payload)
      const tx = await this.getTx(transfer_transaction_payload.reference_id)
      return (tx as Transfer)
      } catch (error:any) {
          throw new HttpException('something went wrong', 500)
      }
  }

  async getAll(account_no: string): Promise<GetAllTransferRepository.Response> {
    try {
      const txs = await db('transactions')
      .where({debit_wallet:account_no, transaction_type: 'transfer'})
      .orWhere({credit_wallet:account_no, transaction_type: 'transfer'})
      return txs
    } catch (error:any) {
          throw new HttpException('something went wrong', 500)
    }
  }

  async getTx(reference_id: string): Promise<Transfer | void> {
    try {
        const tx = await db('transactions').where('reference_id', reference_id)
        return tx[0]
    } catch (error:any) {
          throw new HttpException('something went wrong', 500)
    }
}

}