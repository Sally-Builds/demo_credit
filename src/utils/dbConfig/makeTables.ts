import db from "./dbConnection";

const createUsersTable = async () => {
    try {
        const exists = await db.schema.hasTable('users')

        if(!exists) {
            db.schema.createTable('users', (table) => {
                table.uuid("id").primary().defaultTo(db.raw("(UUID())"));
                table.string("name")
                table.string('email').unique()
                table.string('password')
                table.enum('role', ["lender", "borrower"])
            })
        }
        console.log('users table created successfully')
    } catch (error) {
        console.log(error)
    }
}

const createWalletsTable = async () => {
    try {
        const exists = await db.schema.hasTable('wallets')

        if(!exists) {
            db.schema.createTable('wallets', (table) => {
                table.uuid("id").primary().defaultTo(db.raw("(UUID())"))
                table.uuid("user_id")
                table.float('balance')
                table.foreign('user_id').references('users.id')
            })
        }
        console.log('Wallets table created successfully')
    } catch (error) {
        console.log(error)
    }
}

const createTransactionTable = async () => {
    try {
        const exists = await db.schema.hasTable('wallets')

        if(!exists) {
            db.schema.createTable('transactions', (table) => {
                table.uuid("id").primary().defaultTo(db.raw("(UUID())"))
                table.string("reference_id")
                table.date('date')
                table.float('amount')
                table.string('transaction_type')
                table.string('bank_name')
                table.uuid('credit_wallet').nullable()
                table.uuid('debit_wallet').nullable()
                table.integer('account_number').nullable()
            
                table.foreign('credit_wallet').references('wallets.id')
                table.foreign('debit_wallet').references('wallets.id')
            })
        }
        console.log('Transactions table created successfully')
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
