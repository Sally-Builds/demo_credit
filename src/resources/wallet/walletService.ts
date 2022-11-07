import { WalletDB } from "./walletPersistence";
import Wallet from "./walletInterface";

class UserService {

    private walletDB = new WalletDB()

    public async create (wallet: Wallet): Promise<string | Error> {
        try {  
            wallet.balance = 0
            const walletInfo = this.walletDB.create(wallet)

            return `created successfully - ${walletInfo}`
            
        } catch (error:any) {
                throw new Error(error)
        }
    }
}

export default UserService