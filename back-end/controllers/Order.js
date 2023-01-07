const db = require('../db')

const uuid = require('uuid')

const getOrdersOfUser = async (req, res, next) => {
    const { uid } = req.user
    const statement =
        `SELECT app_order.*, json_agg(to_jsonb(dish.*) || jsonb_build_object('quantity', ordered_item.quantity)) as items, to_jsonb(restaurant.*) as restaurant
        FROM app_order
                 JOIN ordered_item ordered_item ON app_order.id = ordered_item.order_id
                 JOIN dish ON dish.id = ordered_item.dish_id
                 JOIN restaurant on app_order.restaurant_id = restaurant.id
        WHERE app_order.uid = $1
        GROUP BY app_order.id, restaurant.id
        `

    try {
        const { rows } = await db.query(statement, [uid])

        res.status(200).json(rows)
    } catch (err) {
        console.log(err)
        next(err)

    }


}


const rateOrder = async (req, res, next) => {

}

const addNewOrder = async (req, res, next) => {

    const { info, cart } = req.body

    const { uid } = req.user

    const amountPaid = cart.amountPaid
    const items = cart.items
    const restaurantId = cart.restaurant.id
    try {

        await db.query('BEGIN')


        const statement = `SELECT dish.id, dish.price, restaurant.delivery_cost 
                    FROM dish 
                    LEFT JOIN restaurant ON dish.restaurant_id = restaurant.id
                    WHERE restaurant.id=$1 
                    AND dish.id = ANY($2::int[])`


        const { rows } = await db.query(statement, [restaurantId, items.map(item => item.id)])





        const priceMap = rows.reduce(function (map, item) {
            map[item.id] = item.price;
            return map;
        }, {});



        // rows can be empty but its handier to check later.
        let total = Number(rows[0].delivery_cost) || 0

        items.forEach(({ id, quantity }) => {
            const price = Number(priceMap[id]) || 0
            total += price * quantity

        })



        //Dupplcate item and/or items not from the same restaurant or inconsitent amount paid
        if (items.length > priceMap.length || amountPaid != total || rows.length == 0) {
            await db.query('ABORT')
            res.status(400).json({ msg: 'There is some thing wrong with your order' })
            next()
        }


        const orderId = uuid.v4()

        const insertOrderStatement = `INSERT INTO app_order(id, uid, restaurant_id, name, email, address) values ($1, $2, $3, $4, $5, $6)`


        await db.query(insertOrderStatement, [orderId, uid, restaurantId, info.name, info.email, `${info.address}, ${info.city}, ${info.postcode}`])

        const orderedItems = items.map(item => [orderId, item.quantity, item.id])
        console.log(info)



        const valueSet = orderedItems.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',');

        const insertItemsStatement = `INSERT INTO ordered_item(order_id, quantity, dish_id) values ${valueSet}`

        await db.query(insertItemsStatement, orderedItems.flat())



        console.log(insertItemsStatement)
        await db.query('COMMIT')
        res.status(201).json({ msg: 'Ordered added' })


    } catch (err) {
        await db.query('ABORT')
        next(err)
    }

}

module.exports = { getOrdersOfUser, rateOrder, addNewOrder }

