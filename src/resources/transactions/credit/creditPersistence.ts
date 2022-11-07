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
}