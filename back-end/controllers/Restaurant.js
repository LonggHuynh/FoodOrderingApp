const { json } = require('express')
const db = require('../db')



const getAllRestaurants = async (req, res, next) => {
    try {
        const statement =
            `SELECT restaurant.*, avg(app_order.rating) as rating 
            FROM restaurant
            LEFT JOIN app_order on restaurant.id = app_order.restaurant_id
            GROUP BY restaurant.id`
        const { rows } = await db.query(statement)
        res.status(200).json({ data: rows })


    } catch (err) {
        next(err)
    }
}


const getRestaurant = async (req, res, next) => {
    try {
        const statement = `SELECT restaurant.* ,json_agg(to_jsonb(dish.*)) as dishes,  avg(app_order.rating) as rating
                            FROM restaurant
                            LEFT JOIN dish on restaurant.id = dish.restaurant_id
                            LEFT JOIN app_order on restaurant.id = app_order.restaurant_id
                            WHERE restaurant.id = $1
                            GROUP BY restaurant.id
                            `
        
        const { id } = req.params
        const { rows } = await db.query(statement, [id])
        if (rows.length==0){
            res.status(404).json({msg:`Restaurant not found`})
        }
        res.status(200).json({ data: rows[0] })
    } catch (err) {
        next(err)
    }
}





module.exports = { getAllRestaurants, getRestaurant }