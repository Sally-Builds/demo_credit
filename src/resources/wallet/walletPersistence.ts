import db from "@/utils/dbConfig/dbConnection";
import Wallet from "./walletInterface";

export class WalletDB {
    async create(wallet: Omit<Wallet, 'id'>): Promise<void> {
        await db('wallets').insert(wallet)
    }

    async getId(user_id: string): Promise<string | void> {
        try {
            const wallet_id = await db('wallets').where('user_id', user_id).select('id')
            return wallet_id[0].id
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getBalance(wallet_id: string): Promise<number | void> {
        try {
            console.log(wallet_id)
            const data = await db('wallets').where('id', wallet_id).select('balance')
            return data[0].balance
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }

    async updateBalance(wallet_id: string, newBalance:number): Promise<string | void> {
        try {
            const data = await db('wallets').where({id: wallet_id}).update({balance: newBalance})
            console.log(data, 'updated data')
            return 'successful'
        } catch (error:any) {
            throw new Error(error)
        }
    }
}
