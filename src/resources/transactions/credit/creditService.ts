import { CreditDB } from "./creditPersistence";
import { Credit } from "./creditInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";
import walletService from "@/resources/wallet/walletService";

class CreditService {
    
    public creditDB = new CreditDB()

    public async create (amount: number, user_id: string): Promise<Credit | Error> {
        try {  
            //get wallet id of the user
            const credit_wallet = await new WalletDB().getAccountNo(user_id)

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
            walletService.increaseBalance({amount: (creditTx as Credit).amount, credit_wallet})
            return (creditTx as Credit)
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }


    public async getAll (user_id: string): Promise<Credit[] | Error> {
        try {
            //get wallet account no
            const account_no = await new WalletDB().getAccountNo(user_id)

            // query of a credit with account no
            const creditTxs = await this.creditDB.getAllTx((account_no as string))

            //return result
            return (creditTxs as Credit[])
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

export default CreditService