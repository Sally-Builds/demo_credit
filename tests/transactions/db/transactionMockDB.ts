// import Transaction from '../../../src/resources/transactions/TransactionInterface'
// import { Credit } from '../../../src/resources/transactions/credit/creditInterface'

const transactionsDB: any[] = [
  {
    id: 1,
    date: new Date(),
    transaction_type: 'credit',
    reference_id: '54321072883',
    amount: 1200,
    credit_wallet: '1234567890'
  },
  {
    id: 2,
    date: new Date(),
    transaction_type: 'credit',
    reference_id: '73848283843',
    amount: 900,
    credit_wallet: '1234506789'
  },
  {
    id: 3,
    date: new Date(),
    transaction_type: 'credit',
    reference_id: '827838363739',
    amount: 200,
    debit_wallet: '1234567890'
  },
  {
    id: 4,
    date: new Date(),
    transaction_type: 'credit',
    reference_id: '48934732478',
    amount: 400,
    credit_wallet: '1234567890'
  }
]

export { transactionsDB }
