const db = require('../db')



const validateUser = async (req, res, next) => {
    const { uid } = req.user
    try {
        const { rows } = await db.query('SELECT id from app_user WHERE id = $1', [uid])
        if (rows.length)
            res.status(200).json({ msg: "Logged in" })
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
        next()
    }
    catch (err) {
        if (err.code === "23505")
            res.status(400).send({ msg: "User already existed" })
        else
            next(err)
    }
}


module.exports = { validateUser, addUser }