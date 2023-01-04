const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const {
    validateUser,
    addUser,

} = require('../controllers/User')


router.route('/').post(auth, addUser).get(auth, validateUser)

module.exports = router
