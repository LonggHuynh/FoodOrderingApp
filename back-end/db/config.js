const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({ connectionString: process.env['CONNECTIONSTRING'] })

async function connect(retries = 5, retryInterval = 5000) {
    for (; ;) {
        try {
            await pool.connect()
            console.log("Connected to PostgreSQL")
            return
        } catch (err) {
            if (retries == 0) {
                throw err;
            }
            console.log(`Error connecting to PostgreSQL: ${err}. Retrying in ${retryInterval}ms`)
            retries--
            await new Promise(resolve => setTimeout(resolve, retryInterval))
        }
    }
}


connect()

module.exports = pool
