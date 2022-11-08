import { Event } from "@/utils/events";
import { WithdrawDB } from "./withdrawPersistence";
import Withdraw from "./withdrawInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";

class WithdrawService {
    
    public withdrawDB = new WithdrawDB()
    

    public async create (amount: number, bank_name: string, bank_account_no: number, user_id: string): Promise<Withdraw | Error> {
        try {  
            const walletDB = new WalletDB()
            //get wallet id of the user
            const debit_wallet = await walletDB.getAccountNo(user_id)

            if(!debit_wallet) {
                throw new Error('something went wrong')
            }

            //check if 
            const previousBalance = await walletDB.getBalance(debit_wallet)
            if(amount > previousBalance) {
                throw new Error('You do not have up to that amount to withdraw')
            }

            const transaction: Omit<Withdraw, "id"> = {
                date: new Date(),
                transaction_type: 'withdraw',
                reference_id: `${Date.now() + user_id.split("-")[4]}`,
                amount,
                debit_wallet, 
                bank_name,
                bank_account_no,
            }
            const withdrawTX = await this.withdrawDB.create(transaction)
            Event.publish('withdrawnTransaction', {amount: (withdrawTX as Withdraw).amount,  debit_wallet})
            return (withdrawTX as Withdraw)
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }

    public async getAll (user_id: string): Promise<Withdraw[] | Error> {
        try {
            //get wallet account no
            const account_no = await new WalletDB().getAccountNo(user_id)

            // query of a credit with account no
            const withdrawTxs = await this.withdrawDB.getAllTx((account_no as string))

            //return result
            return (withdrawTxs as Withdraw[])
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

export default WithdrawService