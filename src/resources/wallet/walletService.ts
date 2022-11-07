import { WalletDB } from "./walletPersistence";
import Wallet from "./walletInterface";
import { Event } from "@/utils/events";

class WalletService {
    public walletDB;
    constructor() {
         this.walletDB = new WalletDB()
        Event.subscribe('userCreated', this)
    }


    public async execute (user_id: string): Promise<string | Error> {
        try {  
            const wallet = {
                balance: 0,
                user_id: user_id
            }
            const walletInfo = this.walletDB.create(wallet)

            return `created successfully - ${walletInfo}`
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }
}

export default WalletService