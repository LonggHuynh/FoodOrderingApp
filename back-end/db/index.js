const pool = require('./config')

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
}