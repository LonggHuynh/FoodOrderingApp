const db = require('../db')



const validateUser = async (req, res, next) => {
    const { uid } = req.user
    try {
        const { rows } = await db.query(
            `SELECT app_user.id, restaurant.id as restaurant_id from app_user 
            LEFT JOIN restaurant on restaurant.id = app_user.id
            WHERE app_user.id = $1
            `
            , [uid])

        console.log({ msg: "Logged in", data: rows[0] })
        if (rows.length)
            res.status(200).json({ msg: "Logged in", data: rows[0] })
        else
            res.status(403).json({ msg: "User not found" })
    } catch (err) {
        next(err)
    }

}


const addUser = async (req, res, next) => {
    const { uid } = req.user
    const statement = 'INSERT INTO app_user VALUES ($1)'

    try {
        await db.query(statement, [uid])
        res.status(201).json({ msg: "User registered" })

    }
    catch (err) {
        if (err.code === "23505")
            res.status(400).send({ msg: "User already existed" })
        else
            next(err)
    }
}


module.exports = { validateUser, addUser }