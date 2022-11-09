import { WalletDB } from "./walletPersistence";

class WalletService {
    constructor() {}

    public async create (user_id: string, Wallet = WalletDB): Promise<string | Error> {
        try {  
            const walletCred = {
                balance: 0,
                user_id: user_id,
                account_no: WalletService.generateAccountId()
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
            const previousBalance = await walletDB.getBalance(data.credit_wallet)

            //do the math
            const newBalance = (previousBalance as number) + data.amount

            //update balance
            await walletDB.updateBalance(data.credit_wallet, newBalance)
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
            const previousBalance = await walletDB.getBalance(data.debit_wallet)

            //do the math
            const newBalance = (previousBalance as number) - data.amount

            //update balance
            await walletDB.updateBalance(data.debit_wallet, newBalance)
            return 'successful'
        } catch (error:any) {
            console.log(error)
            throw new Error(error)
        }
    }
}

// export default WalletService

const walletService = new WalletService()
export default walletService