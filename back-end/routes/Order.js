const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const {
        getOrdersOfUser,
        rateOrder,
        addNewOrder
} = require('../controllers/Order')



router.route('/').post(auth, addNewOrder).get(auth, getOrdersOfUser)
router.route('/:id').put(auth, rateOrder)


module.exports = router