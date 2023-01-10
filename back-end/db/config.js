const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
})

pool.connect()

module.exports = pool
