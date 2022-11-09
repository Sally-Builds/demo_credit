import { Credit } from '../creditInterface'

const fakeCredit = ():Credit => {
  return {
    id: 'id',
    transaction_type: 'credit',
    date: new Date(),
    reference_id: 'ref_id',
    amount: 800,
    credit_wallet: 'creditor_wallet'
  }
}

export default fakeCredit
