import {Knex, knex} from 'knex'

/**
 * @type {Knex}
 */
let config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'wgke3mf12345',
        database: 'node_app'
    },
}

const db = knex(config)
export default db