import React from 'react'
import { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import CartInfo from '../components/CartInfo'
import "./Checkout.css"
import url from '../config/api'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";





const Orders = () => {


    const [value, setValue] = useState(false);



    const accessToken = useSelector(state => state.user?.accessToken)

    const [selectedOrder, setSelectedOrder] = useState({ items: [] })


    const [orders, setOrders] = useState(null)
    useEffect(() => {
        fetch(url('/orders'), {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
        })
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.msg)
                }
                return data

            }).then(data => {
                const orders = data.map(order => {
                    const price = order.items.map(item => item.quantity * item.price).reduce((partialSum, a) => partialSum + a, 0)
                    return { ...order, price }
                })
                setOrders(orders)
            }).catch((error) => toast.error(error.message))


    }, [value])







    return (
        orders ?
            <div className='checkout flex w-full'>
                <div className=' flex-1 px-32 py-32  flex flex-col gap-10'>
                    <p className='text-4xl'>Order History</p>

                    {
                        orders.map(order => <OrderCard key={order.id} order={order} selectOrder={() => setSelectedOrder(order)} rerender={()=> setValue(prev=>!prev)} />)
                    }

                </div>
                <CartInfo items={selectedOrder.items} restaurant={selectedOrder.restaurant} price={selectedOrder.price} />
            </div>
            :
            <div className=' flex items-center justify-center h-screen'>
                <ClipLoader />
            </div>
    )
}

export default Orders