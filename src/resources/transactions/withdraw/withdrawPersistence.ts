import db from "@/utils/dbConfig/dbConnection";
import Withdraw from "./withdrawInterface";

export class WithdrawDB {
    async create(transaction: Omit<Withdraw, 'id'>): Promise<Withdraw | void> {
        try {
        await db('transactions').insert(transaction)
        const tx = this.getTx(transaction.reference_id)
        return tx
        } catch (error:any) {
            throw new Error(error)
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

    async getAllTx(account_no: string): Promise<Withdraw[] | void> {
        try {
            const txs = await db('transactions').where({debit_wallet:account_no, transaction_type: 'withdraw'})
            return txs
        } catch (error:any) {
            throw new Error(error)
        }
    }
}