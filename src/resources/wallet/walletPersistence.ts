import db from "@/utils/dbConfig/dbConnection";
import Wallet from "./walletInterface";

export class WalletDB {
    async create(wallet: Omit<Wallet, 'id'>): Promise<void> {
        await db('wallets').insert(wallet)
    }

    async getAccountNo(user_id: string): Promise<string | void> {
        try {
            const wallet_id = await db('wallets').where('user_id', user_id).select('account_no')

            if(wallet_id.length <= 0) {
                throw new Error('something went wrong')
            }
            return wallet_id[0].account_no
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getBalance(account_no: string): Promise<number | void> {
        try {
            const data = await db('wallets').where('account_no', account_no).select('balance')
            return data[0].balance
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }

    async updateBalance(account_no: string, newBalance:number): Promise<string | void> {
        try {
            const data = await db('wallets').where({account_no: account_no}).update({balance: newBalance})
            console.log(data, 'updated data')
            return 'successful'
        } catch (error:any) {
            throw new Error(error)
        }
    }
}
