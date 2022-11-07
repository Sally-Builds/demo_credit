import { Event } from "@/utils/events";
import { WithdrawDB } from "./withdrawPersistence";
import Withdraw from "./withdrawInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";

class WithdrawService {
    
    public withdrawDB = new WithdrawDB()
    

    public async create (amount: number, bank_name: string, account_number: number, user_id: string): Promise<Withdraw | Error> {
        try {  
            const walletDB = new WalletDB()
            //get wallet id of the user
            const debit_wallet = await walletDB.getId(user_id)

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
                transaction_type: 'credit',
                reference_id: `${Date.now() + user_id.split("-")[4]}`,
                amount,
                debit_wallet, 
                bank_name,
                account_number,
            }
            const withdrawTX = await this.withdrawDB.create(transaction)
            Event.publish('withdrawnTransaction', {amount: (withdrawTX as Withdraw).amount, wallet_id: debit_wallet})
            return (withdrawTX as Withdraw)
            
        } catch (error:any) {
            console.log(error)
                throw new Error(error)
        }
    }
}

export default WithdrawService