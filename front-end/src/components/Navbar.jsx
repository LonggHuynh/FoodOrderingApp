import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config"
import { useSelector, useDispatch } from "react-redux"
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { actionType } from '../redux/';
import url from '../config/api'
import EditRestaurantCard from './EditRestaurantCard';
const Navbar = () => {


    const [editRestaurant, setEditRestaurant] = useState(false)

    const [isMenu, setIsMenu] = useState(false)
    const currentUser = useSelector(state => state.user)
    const dispatch = useDispatch()
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const { restaurant, price } = useSelector(state => state.cart)




    const signup = async () => {

    }
    const login = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const { uid, email, displayName, accessToken } = user

        const response = await fetch(url('/users'), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).catch(err => console.log(err))
        const data = await response.json().catch(err => console.log(err))
        console.log(data)


        const action = { type: actionType.SET_USER, payload: { uid, email, displayName, accessToken } }
        dispatch(action)
    }




    const logout = () => {
        sessionStorage.clear()
        window.location.reload()
    }

    return (

        <div className='mb-25 z-[1] h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10   justify-between'>

            {editRestaurant && <EditRestaurantCard action='Create' closeTab={()=> setEditRestaurant(false)} />}

            <div className="logo flex items-center text-3xl font-bold">Logo</div>
            <div className="cartAndMenu flex items-center gap-4">
                <Link to={restaurant ? `/restaurants/${restaurant.id}` : ''} className="cart h-12 p-4 flex justify-between items-center border rounded-lg w-32" onClick={restaurant || ((event) => event.preventDefault())}>
                    <span><ShoppingBasketIcon /></span>
                    <span>${price}</span>
                </Link>

                <div className="menu relative">
                    <div className="menuButton  h-12 p-4 flex items-center border w-12 rounded-lg justify-center cursor-pointer" onClick={() => setIsMenu(prev => !prev)}>
                        <MenuIcon />
                    </div>

                    {
                        isMenu &&
                        (
                            <div className="menuBar absolute top-14 right-0 border rounded-lg w-40 right flex flex-col bg-primaryOpposite text-primary drop-shadow-lg">
                                {
                                    currentUser ?
                                        <>
                                            <div className="p-4 border-1 border-b">{currentUser.displayName}</div>
                                            <div className="p-4 border-1 border-b cursor-pointer">My orders</div>
                                            <div className="p-4 border-1 border-b cursor-pointer" onClick={() => setEditRestaurant(true)}>Create restaurant </div>
                                            <div className="p-4 border-1 border-b cursor-pointer" onClick={logout}>Logout</div>
                                        </>
                                        :
                                        <>
                                            <div className="p-4 border-1 border-b cursor-pointer" onClick={login}>Login</div>
                                            <div className="p-4 border-1 border-b cursor-pointer" onClick={signup}>Signup</div>
                                        </>
                                }

                            </div>
                        )
                    }



                </div>

            </div>
        </div >
    )
}

export default Navbar