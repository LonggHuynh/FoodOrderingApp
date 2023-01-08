const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    getAllRestaurants,
    getRestaurant,
    createRestaurant,
    editRestaurant

} = require('../controllers/Restaurant')



router.route('/').get(getAllRestaurants).post(auth, createRestaurant).put(auth, editRestaurant)

router.route('/:id').get(getRestaurant)

module.exports = router
