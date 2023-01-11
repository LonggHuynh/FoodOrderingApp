const { json } = require('express')
const db = require('../db')



const getAllRestaurants = async (req, res, next) => {

    const roundNumber = (num) => num.toString() + (num % 1 === 0 ? '.0' : '')
    try {
        const statement =
            `SELECT restaurant.*, avg(app_order.rating) as rating 
            FROM restaurant
            LEFT JOIN app_order on restaurant.id = app_order.restaurant_id
            GROUP BY restaurant.id`
        let { rows } = await db.query(statement)
        rows = rows.map(restaurant => ({ ...restaurant, rating: restaurant.rating && roundNumber(Math.round(restaurant.rating * 10) / 10) }))
        res.status(200).json({ data: rows })


    } catch (err) {
        next(err)
    }
}


const createRestaurant = async (req, res, next) => {
    const { uid } = req.user
    const restaurant = req.body
    const statement =
        'INSERT INTO restaurant values($1,$2,$3,$4,$5,$6)'

    try {
        await db.query(statement, [uid, restaurant.name, restaurant.logo_url, restaurant.delivery_cost, restaurant.background_url, restaurant.min_order])
        res.status(201).json({ msg: 'Restaurant created' })

    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ msg: 'You cannot have more than 1 restaurant' })
        } else {
            next(err)
        }
    }
}

const editRestaurant = async (req, res, next) => {
    const { uid } = req.user
    const restaurant = req.body

    const statement = `UPDATE restaurant 
        SET name = $1, logo_url = $2, delivery_cost = $3, background_url=$4, min_order=$5
        WHERE id = $6   
    `
    try {
        const { rowCount } = await db.query(statement, [restaurant.name, restaurant.logo_url, restaurant.delivery_cost, restaurant.background_url, restaurant.min_order, uid])
        if (rowCount == 0) {
            res.status(400).json({ msg: 'You do not have any restaurants' })
        }
        res.status(201).json({ msg: 'Restaurant updated' })
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({ msg: 'You cannot have more than 1 restaurant' })
        } else {
            next(err)
        }
    }
}

const getRestaurant = async (req, res, next) => {
    try {
        const statement =
            `SELECT restaurant.*,
            (SELECT json_agg(to_jsonb(dish)) FROM dish WHERE dish.restaurant_id = restaurant.id) as dishes,
            (SELECT avg(app_order.rating) FROM app_order WHERE app_order.restaurant_id = restaurant.id) as rating,
            (SELECT count(app_order.rating) FROM app_order WHERE app_order.restaurant_id = restaurant.id) as order_count
        FROM restaurant
        WHERE restaurant.id = $1;`

        const { id } = req.params
        const { rows } = await db.query(statement, [id])
        if (rows.length == 0) {
            res.status(404).json({ msg: `Restaurant not found` })
        }
        res.status(200).json({ data: rows[0] })
    } catch (err) {
        next(err)
    }
}





module.exports = { getAllRestaurants, getRestaurant, createRestaurant, editRestaurant }