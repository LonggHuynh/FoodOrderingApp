const express = require('express')
const router = express.Router()

const {
    getAllRestaurants,
    getRestaurant,

} = require('../controllers/Restaurant')



router.route('/').get(getAllRestaurants)
router.route('/:id').get(getRestaurant)

module.exports = router
