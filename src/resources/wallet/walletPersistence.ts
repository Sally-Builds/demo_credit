import db from "@/utils/dbConfig/dbConnection";
import Wallet from "./walletInterface";

export class WalletDB {
    async create(wallet: Wallet): Promise<void> {
        await db('wallets').insert(wallet)
    }
}