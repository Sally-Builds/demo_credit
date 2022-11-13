import { Credit } from '../../../../src/resources/transactions/credit/creditInterface'

const credit_db: Credit[] = [
  {
    id: 'tx_id',
    date: new Date(),
    transaction_type: 'credit',
    reference_id: `${Date.now() + 'user_id'.split('-')[4]}`,
    amount: 200,
    credit_wallet: '1234567890'
  },
  {
    id: 'tx_id',
    date: new Date(),
    transaction_type: 'credit',
    reference_id: `${Date.now() + 'user_id'.split('-')[4]}`,
    amount: 1000,
    credit_wallet: '1234567890'
  },
  {
    id: 'tx_id',
    date: new Date(),
    transaction_type: 'credit',
    reference_id: `${Date.now() + 'user_id'.split('-')[4]}`,
    amount: 900,
    credit_wallet: '1234567890'
  }
]

export default credit_db
