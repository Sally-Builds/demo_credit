import Wallet from '../../../src/resources/wallet/walletInterface'

const walletMockDB:Wallet[] = [
  {
    id: 1,
    balance: 1200,
    user_id: 'user1_id',
    account_no: '1234506789'
  },
  {
    id: 1,
    balance: 300,
    user_id: '1-js-sh-sjf-jsk',
    account_no: '0987654321'
  },
  {
    id: 3,
    balance: 2000,
    user_id: 'user3_id',
    account_no: '6528765390'
  },
  {
    id: 4,
    balance: 1900,
    user_id: 'user4_id',
    account_no: '1563096549'
  }

]

export default walletMockDB
