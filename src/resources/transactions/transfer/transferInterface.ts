import Transaction from '@/resources/transactions/TransactionInterface'

export default interface Transfer extends Transaction {
    credit_wallet: string,
    debit_wallet: string,
}