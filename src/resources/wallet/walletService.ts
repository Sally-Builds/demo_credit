import { WalletDB } from "./walletPersistence";
import { Event } from "@/utils/events";
import Wallet from "./walletInterface";

class WalletService {
    constructor() {
        Event.subscribe('userCreated', this.create)
        Event.subscribe('creditedTransaction', this.increaseBalance)
        Event.subscribe('withdrawnTransaction', this.decreaseBalance)
    }


    public async create (user_id: string, Wallet = WalletDB): Promise<string | Error> {
        try {  
            const walletCred = {
                balance: 0,
                user_id: user_id,
                account_id: WalletService.generateAccountId()
            }
            const walletDB = new Wallet()
            const walletInfo = walletDB.create(walletCred)
            return `created successfully - ${walletInfo}`
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }

    static generateAccountId(): string {
        return `${Math.floor(1000000000 + Math.random() * 9000000000)}`
    }

    public async increaseBalance(data: any, Wallet = WalletDB): Promise<string | Error> {
        try {
            const walletDB = new Wallet()
            //get the balance from the db
            const previousBalance = await walletDB.getBalance(data.wallet_id)

            //do the math
            const newBalance = (previousBalance as number) + data.amount
            console.log(newBalance)

            //update balance
            await walletDB.updateBalance(data.wallet_id, newBalance)
            return 'successful'
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }

    public async decreaseBalance(data: any, Wallet = WalletDB): Promise<string | Error> {
        try {
            const walletDB = new Wallet()
            //get the balance from the db
            const previousBalance = await walletDB.getBalance(data.wallet_id)

            //do the math
            const newBalance = (previousBalance as number) - data.amount
            console.log(newBalance)

            //update balance
            await walletDB.updateBalance(data.wallet_id, newBalance)
            return 'successful'
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default WalletService