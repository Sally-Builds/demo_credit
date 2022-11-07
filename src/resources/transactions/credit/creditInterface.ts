import Transaction from "../TransactionInterface"

export interface Credit extends Transaction {
    credit_wallet: string
}