import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Basket from '../components/Basket'
import "./Checkout.css"
import url from '../config/api'
import { actionType } from '../redux'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";

const Checkout = () => {


    const loggedInName = useSelector(state => state.user?.displayName)
    const loggedInEmail = useSelector(state => state.user?.email)
    const accessToken = useSelector(state => state.user?.accessToken)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const formRef = useRef(null)
    const navigate = useNavigate();
    const [info, setInfo] = useState({ name: loggedInName || "", address: "", email: loggedInEmail || "", postcode: "", city: "" })





    const handleChange = (e) => setInfo(prevInfo => ({ ...prevInfo, [e.target.name]: e.target.value }));


    const [loading, setLoading] = useState(false)


    // To prevent double click
    useEffect(() => {
        if (loading) {
            const path = accessToken ? '/orders' : '/orders/no-auth'
            composeOrder().then((order) => fetch(url(path), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': accessToken ? `Bearer ${accessToken}` : null
                },
                body: JSON.stringify(order)
            }))
                .then(async (response) => {
                    const data = await response.json()
                    if (!response.ok) {
                        throw new Error(data.msg)
                    }
                    return data

                }).then((data) => toast.success(data.msg))
                .then(() => dispatch({ type: actionType.CLEAR_CART }))
                .then(() => navigate(accessToken ? '/orders' : '/'))
                .then(() => setLoading(false))
            .catch((error) => {toast.error(error.message); setLoading(false)})
        }
    }, [loading])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
    }




    const composeOrder = async () => {


        if (!cart.restaurant){
            throw new Error('There is nothing to checkout')
        }
        const simplifiedCart = {}
        //Reduce the size of the cart
        simplifiedCart.restaurant = { id: cart.restaurant.id }
        simplifiedCart.items = cart.items.map(item => ({ id: item.id, quantity: item.quantity }))
        simplifiedCart.amountPaid = Number(cart.price) + Number(cart.restaurant.delivery_cost)

        return { info, cart: simplifiedCart }

    }

    return (
        <>
            {loading ?
                <div className=' flex items-center justify-center h-screen'>
                    <ClipLoader />
                </div>
                :
                <div className='checkout flex w-full'>


                    <div className='formContainer flex-1 px-20 py-24'>
                        <p className='mb-10 text-4xl'>Check out </p>

                        <form ref={formRef} onSubmit={handleSubmit}>

                            <div className="rounded-lg drop-shadow-lg border  px-10 py-14 flex flex-col">
                                <div className="flex  ">
                                    <div className="flex-1 ">
                                        <p className='text-2xl'>Address</p>
                                        <div className='addressDetailsContainer flex flex-col gap-10 py-5 pr-14 mt-2'>

                                            <input type="text" name="name" required placeholder="Name" className='border-b' value={info.name} onChange={handleChange} />
                                            <input type="email" required name="email" placeholder="Email" className='border-b' value={info.email} onChange={handleChange} />
                                            <input type="text" name="address" required placeholder="Address" className='border-b' value={info.address} onChange={handleChange} />

                                            <div className="flex  gap-5">

                                                <div className="flex-1">
                                                    <input type="text" name="postcode" required placeholder="Post code" className='border-b' value={info.postcode} onChange={handleChange} />
                                                </div>

                                                <div className="flex-1">
                                                    <input type="text" id="state" name="city" required placeholder="City" className='border-b' value={info.city} onChange={handleChange} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <p className='text-2xl'>Card</p>
                                        <div className='addressDetailsContainer flex flex-col gap-10 py-5 pr-10 mt-2'>

                                            <input type="text" id="cname" name="cardname" placeholder="Card holder name ( No need to fill :) )" />
                                            <input type="text" id="ccnum" name="cardnumber" placeholder="Card number ( No need to fill :) )" />
                                            <input type="text" id="expmonth" name="expmonth" placeholder="Expiry moth ( No need to fill :) )" />

                                            <div className="flex gap-5">
                                                <div className="flex-1">
                                                    <input type="text" id="expyear" name="expyear" placeholder="Expiry year ( No need to fill :) )" />
                                                </div>
                                                <div className="flex-1">
                                                    <input type="text" id="cvv" name="cvv" placeholder="CVV ( No need to fill :) )" />
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <button type='submit' className='ml-auto bg-primary text-white px-4 py-2 rounded-lg mt-7 text-lg' >Complete order</button>
                            </div>
                        </form>
                    </div>
                    <Basket />
                </div>



            }
        </>
    )
}

export default Checkout