import { Knex, knex } from 'knex'

/**
 * @type {Knex}
 */
const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  }
}

const db = knex(config)
export default db
