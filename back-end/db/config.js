const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env['CONNECTIONSTRING']
})

pool.connect()

module.exports = pool
