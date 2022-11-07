import Transaction from '../TransactionInterface'

export default interface Withdraw extends Transaction {
    debit_wallet: string
    bank_name: string,
    account_number: number
}