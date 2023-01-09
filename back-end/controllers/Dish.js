const { json } = require('express')
const db = require('../db')
const crypto = require('crypto')





const createDish = async (req, res, next) => {
    const { uid } = req.user
    const dish = req.body
    const uuid = crypto.randomUUID();

    const statement =
        'INSERT INTO dish values($1,$2,$3,$4,$5,$6,$7)'

    try {
        await db.query(statement, [uuid, dish.name, dish.description, uid, dish.img, dish.price, dish.category])
        res.status(201).json({ msg: 'Dish added', dish_id: uuid })


    } catch (err) {
        next(err)
    }
}

const editDish = async (req, res, next) => {
    const { uid } = req.user
    const dish = req.body

    const statement = `UPDATE dish 
        SET name = $1,  description = $2, img=$3, price=$4, category=$5
        WHERE id = $6
        AND restaurant_id = $7
    `
    try {

        const { rowCount } = await db.query(statement, [dish.name, dish.description, dish.img, dish.price, dish.category, dish.id, uid])
        if (rowCount == 0) {

            console.log(uid)
            res.status(400).json({ msg: 'You are not the owner of the dish' })
        }
        else {
            res.status(201).json({ msg: 'Dish updated' })
        }
    } catch (err) {

        next(err)


    }
}







module.exports = { createDish, editDish }