import db from "@/utils/dbConfig/dbConnection";
import { Credit } from "./creditInterface";

export class CreditDB {
    async create(transaction: Omit<Credit, 'id'>): Promise<Credit | void> {
        try {
        await db('transactions').insert(transaction)
        const tx = this.getTx(transaction.reference_id)
        return tx
        } catch (error:any) {
            throw new Error(error)
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

    async getAllTx(account_no: string): Promise<Credit[] | void> {
        try {
            const txs = await db('transactions').where({credit_wallet:account_no, transaction_type: 'credit'})
            return txs
        } catch (error:any) {
            throw new Error(error)
        }
    }
}