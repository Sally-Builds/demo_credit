import { Event } from "@/utils/events";
import { CreditDB } from "./creditPersistence";
import { Credit } from "./creditInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";

class CreditService {
    
    public creditDB = new CreditDB()

    public async create (amount: number, user_id: string): Promise<Credit | Error> {
        try {  
            //get wallet id of the user
            const credit_wallet = await new WalletDB().getId(user_id)

            if(!credit_wallet) {
                throw new Error('something went wrong')
            }
            const transaction: Omit<Credit, "id"> = {
                date: new Date(),
                transaction_type: 'credit',
                reference_id: `${Date.now() + user_id.split("-")[4]}`,
                amount,
                credit_wallet, 
            }
            const creditTx = await this.creditDB.create(transaction)
            Event.publish('creditedTransaction', {amount: (creditTx as Credit).amount, wallet_id: credit_wallet})
            return (creditTx as Credit)
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }
}

export default CreditService