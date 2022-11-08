import { TransferDB } from "./transferPersistence";
import Transfer from "./transferInterface";
import { WalletDB } from "@/resources/wallet/walletPersistence";
import HttpException from "@/utils/exceptions/httpExceptions";
import walletService from "@/resources/wallet/walletService";

class TransferService {
    
    public transferDB = new TransferDB()
    

    public async create (amount: number, credit_wallet: string, user_id: string): Promise<Transfer | Error> {
        try {  
            const walletDB = new WalletDB()
            //get account no of the user
            const debit_wallet = await walletDB.getAccountNo(user_id)

            //check if debit account no exist
            if(!debit_wallet) {
                throw new HttpException("Something went wrong", 500)
            }

            //check if credit acc no exist
            if(!(await walletDB.getWallet(credit_wallet))) {
                throw new HttpException("Account number does not exist", 400)
            }

            //prevent user from crediting his own account
            if(credit_wallet == debit_wallet) {
                throw new HttpException("You cannot transfer to your account", 400)
            }

            //check if balance is sufficient
            const previousBalance = await walletDB.getBalance(debit_wallet)
            if(amount > previousBalance) {
                throw new HttpException("Insufficient funds!", 400)
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
            walletService.increaseBalance({amount: (transferTx as Transfer).amount, credit_wallet})
            walletService.decreaseBalance({amount: (transferTx as Transfer).amount, debit_wallet})
            return (transferTx as Transfer)
            
        } catch (error:any) {
                throw new HttpException(error.message, error.statusCode);
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
                throw new HttpException('Something went wrong', 500);
        }
    }
}

export default TransferService