import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Basket from '../components/Basket'
import "./Checkout.css"
import url from '../config/api'
const Checkout = () => {


    const loggedInName = useSelector(state => state.user?.displayName)
    const loggedInEmail = useSelector(state => state.user?.email)
    const accessToken = useSelector(state => state.user?.accessToken)
    const cart = useSelector(state => state.cart)


    const [info, setInfo] = useState({ name: loggedInName || "", address: "", email: loggedInEmail || "", postcode: "", city: "" })


    const handleChange = (e) => setInfo(prevInfo => ({ ...prevInfo, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault()


        const order = composeOrder()
        fetch(url('/orders'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(order)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }




    const composeOrder = () => {
        const simplifiedCart={}
        //Reduce the size of the cart
        simplifiedCart.restaurant = { id: cart.restaurant.id }
        simplifiedCart.items = cart.items.map(item => ({ id: item.id, quantity: item.quantity }))
        simplifiedCart.amountPaid = Number(cart.price) + Number(cart.restaurant.delivery_cost)

        return { info, cart: simplifiedCart }

    }

    return (
        <div className='checkout flex w-full'>


            <div className='formContainer flex-1 px-20 py-24'>
                <p className='mb-10 text-4xl'>Check out </p>

                <form>

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

                                    <input type="text" id="cname" name="cardname" placeholder="John More Doe" />
                                    <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                                    <input type="text" id="expmonth" name="expmonth" placeholder="September" />

                                    <div className="flex">
                                        <div className="flex-1">
                                            <input type="text" id="expyear" name="expyear" placeholder="2018" />
                                        </div>
                                        <div className="flex-1">
                                            <input type="text" id="cvv" name="cvv" placeholder="352" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <button type='submit' className='ml-auto bg-primary text-white px-4 py-2 rounded-lg mt-7 text-lg' onClick={handleSubmit}>Complete order</button>
                    </div>
                </form>
            </div>
            <Basket />
        </div>
    )
}

export default Checkout