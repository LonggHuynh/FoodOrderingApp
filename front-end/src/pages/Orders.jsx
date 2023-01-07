import React from 'react'
import { useEffect, useState } from 'react'
import Basket from '../components/Basket'
import OrderCard from '../components/OrderCard'
import CartInfo from '../components/CartInfo'
import "./Checkout.css"
import url from '../config/api'

import { useSelector } from 'react-redux'
const Orders = () => {



    const accessToken = useSelector(state => state.user?.accessToken)

    const [selectedOrder, setSelectedOrder] = useState({ items: [] })
    const [price, setPrice] = useState(0)


    console.log(selectedOrder)
    const [orders, setOrders] = useState([])
    useEffect(() => {

        fetch(url('/orders'), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
        })
            .then(response => response.json())
            .then(data => setOrders(data))


    }, [])


    useEffect(() => {
        let total = 0
        selectedOrder.items.forEach(item => total += item.price)
        setPrice(total)
    }, [selectedOrder])


    console.log(orders)


    return (
        <div className='checkout flex w-full'>
            <div className=' flex-1 px-24 py-32  flex flex-col gap-10'>
                <p>Order History</p>

                {
                    orders.map(order => <OrderCard key={order.id} order={order} selectOrder={() => setSelectedOrder(order)} />)
                }

            </div>
            <CartInfo items={selectedOrder.items} restaurant={selectedOrder.restaurant} price={price} />
        </div>
    )
}

export default Orders