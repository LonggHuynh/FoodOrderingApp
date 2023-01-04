const express = require('express')
const router = express.Router()

const {
        getOrdersOfUser,
        getOrder,
        rateOrder,
        addNewOrder
} = require('../controllers/Order')



router.route('/').post(addNewOrder).get(getOrdersOfUser)
router.route('/:id').get(getOrder).put(rateOrder)


module.exports = router