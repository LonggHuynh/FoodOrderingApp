const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}`
})

pool.connect()

module.exports = pool
