import { Event } from "@/utils/events";
import { TransferDB } from "./transferPersistence";
import Transfer from "./transferInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";

class TransferService {
    
    public transferDB = new TransferDB()
    

    public async create (amount: number, credit_wallet: string, user_id: string): Promise<Transfer | Error> {
        try {  
            const walletDB = new WalletDB()
            //get account no of the user
            const debit_wallet = await walletDB.getAccountNo(user_id)

            //check if debit account no exist
            if(!debit_wallet) {
                throw new Error('something went wrong')
            }

            //check if credit acc no exist
            if(!(await walletDB.getWallet(credit_wallet))) {
                throw new Error("Account number does not exist")
            }

            //check if 
            const previousBalance = await walletDB.getBalance(debit_wallet)
            if(amount > previousBalance) {
                throw new Error('Insufficient funds!')
            }

            const transaction: Omit<Transfer, "id"> = {
                date: new Date(),
                transaction_type: 'transfer',
                reference_id: `${Date.now() + user_id.split("-")[4]}`,
                amount,
                debit_wallet, 
                credit_wallet: `${credit_wallet}`,
            }
            const transferTx = await this.transferDB.create(transaction)
            Event.publish('transferredTransaction', {amount: (transferTx as Transfer).amount, debit_wallet, credit_wallet})
            return (transferTx as Transfer)
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }

    public async getAll (user_id: string): Promise<Transfer[] | Error> {
        try {
            //get wallet account no
            const account_no = await new WalletDB().getAccountNo(user_id)

            // query of a credit with account no
            const withdrawTxs = await this.transferDB.getAllTx((account_no as string))

            //return result
            return (withdrawTxs as Transfer[])
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

export default TransferService