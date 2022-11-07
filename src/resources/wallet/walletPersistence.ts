import db from "@/utils/dbConfig/dbConnection";
import Wallet from "./walletInterface";

export class WalletDB {
    async create(wallet: Omit<Wallet, 'id'>): Promise<void> {
        await db('wallets').insert(wallet)
    }
}