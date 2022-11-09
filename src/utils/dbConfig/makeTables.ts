import db from './dbConnection'

const createUsersTable = async () => {
  try {
    const exists = await db.schema.hasTable('users')

    if (!exists) {
      await db.schema.createTable('users', (table) => {
        table.uuid('id').primary().defaultTo(db.schema.raw('(UUID())'))
        table.string('name')
        table.string('email').unique()
        table.string('password')
        table.enum('role', ['lender', 'borrower'])
      }).then(() => {
        console.log('users table created successfully')
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const createWalletsTable = async () => {
  try {
    const exists = await db.schema.hasTable('wallets')

    if (!exists) {
      await db.schema.createTable('wallets', (table) => {
        table.uuid('id').primary().defaultTo(db.schema.raw('(UUID())'))
        table.uuid('user_id')
        table.float('balance')
        table.string('account_no').unique()
        table.foreign('user_id').references('users.id')
      }).then(() => {
        console.log('Wallets table created successfully')
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const createTransactionTable = async () => {
  try {
    const exists = await db.schema.hasTable('transactions')

    if (!exists) {
      await db.schema.createTable('transactions', (table) => {
        table.uuid('id').primary().defaultTo(db.schema.raw('(UUID())'))
        table.string('reference_id')
        table.date('date')
        table.float('amount')
        table.string('transaction_type')
        table.string('bank_name')
        table.uuid('credit_wallet').nullable()
        table.uuid('debit_wallet').nullable()
        table.string('bank_account_no').nullable()

        table.foreign('credit_wallet').references('wallets.account_no')
        table.foreign('debit_wallet').references('wallets.account_no')
      }).then(() => {
        console.log('Transactions table created successfully')
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const makeTable = async () => {
  try {
    await createUsersTable()
    await createWalletsTable()
    await createTransactionTable()
  } catch (error) {
    console.log(error)
  }
}

export default makeTable
