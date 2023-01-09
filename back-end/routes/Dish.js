const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createDish,
    editDish,
} = require('../controllers/Dish')



router.route('/').post(auth, createDish).put(auth, editDish)


module.exports = router
