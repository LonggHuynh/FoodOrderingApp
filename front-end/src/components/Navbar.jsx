import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config"
import { useStateValue } from '../context/StateProvider';

import { useState } from 'react';
import { actionType } from '../context/reducer';
const Navbar = () => {
    const [isMenu, setIsMenu] = useState(false)
    const [state, dispatch] = useStateValue()
    const user = state.user

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()


    const login = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const action = { type: actionType.SET_USER, payload: user }
        dispatch(action)
        localStorage.setItem('user', JSON.stringify(user))
    }


    const logout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <div className='mb-25 z-50 h-20 sticky top-0 bg-primary text-primaryOpposite flex px-10   justify-between'>

            <div className="logo flex items-center text-3xl font-bold">Logo</div>
            <div className="cartAndMenu flex items-center gap-4">
                <div className="cart h-12 p-4 flex justify-between items-center border rounded-lg w-32">
                    <span><ShoppingBasketIcon /></span>
                    <span>$20</span>
                </div>

                <div className="menu relative">
                    <div className="menuButton  h-12 p-4 flex items-center border w-12 rounded-lg justify-center cursor-pointer" onClick={() => setIsMenu(prev => !prev)}>
                        <MenuIcon />
                    </div>

                    {
                        isMenu &&
                        (
                            <div className="menuBar absolute top-14 right-0 border rounded-lg w-40 right flex flex-col bg-primaryOpposite text-primary drop-shadow-lg">
                                {
                                    user ? <>
                                        <div className="p-4 border-1 border-b">{user.displayName}</div>
                                        <div className="p-4 border-1 border-b cursor-pointer">My orders</div>
                                        <div className="p-4 border-1 border-b cursor-pointer" onClick={logout}>Sign out</div>
                                    </>
                                        :
                                        <div className="p-4 border-1 border-b cursor-pointer" onClick={login}>Log in</div>
                                }

                            </div>
                        )
                    }



                </div>

            </div>
        </div>
    )
}

export default Navbar