const db = require('../db')

const uuid = require('uuid')

const getOrdersOfUser = async (req, res, next) => {
    const { uid } = req.user

    const statement = ""


}


const getOrder = async (req, res, next) => {

}


const rateOrder = async (req, res, next) => {

}

const addNewOrder = async (req, res, next) => {
    const { order } = req
    const { restaurantId, items, amountPaid } = order
    try {

        await db.query('BEGIN')


        const statement = `SELECT id, base_price 
                    FROM dish WHERE restaurant_id=$1 
                    AND dish.id = ANY($2::int[])`


        const { rows } = db.query(statement, [restaurantId, items.map(item => item.dishId)])

        const priceMap = rows.reduce(function (map, item) {
            map[item.id] = item.price;
            return map;
        }, {});

        let total = 0
        for ({ dishId, quantity } in priceMap) {
            const price = priceMap[dishId] || 0
            total += price * quantity
        }



        //Dupplcate item and/or items not from the same restaurant or inconsitent amount paid
        if (items.length > priceMap.length || amountPaid != total) {
            await db.query('ABORT')
            res.status(400).json({ msg: 'There is some thing wrong with your order' })
        }


        const orderId = uuid.v5()


        const insertOrderStatement = ``

        const dishIds = items.map(item => [orderId, item.dishId])



        const valueSet = dishIds.map((_, index) => `(${index + 1}, $${index * 2 + 1}, $${index * 2 + 2})`).join(',');

        const insertItemsStatement = `INSERT INTO ordered_item values ${valueSet}`

        await db.query(insertItemsStatement, dishIds.flat())

        db.query('COMMIT')


    } catch (err) {
        await db.query('ABORT')
    }

}

module.exports = { getOrdersOfUser, getOrder, rateOrder, addNewOrder }

