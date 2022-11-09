import {Knex, knex} from 'knex'

/**
 * @type {Knex}
 */
let config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    },
}

const db = knex(config)
export default db