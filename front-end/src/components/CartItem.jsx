import React from 'react'

import { useDispatch } from 'react-redux'
import { actionType } from '../redux'

const CartItem = ({ dish, editable }) => {
    const dispatch = useDispatch()
    return (
        <div className='flex items-center'>
            <div className="left">
                <p className=' py-1'>{dish.name}</p>
                <p className='text-sm'>${dish.price}</p>
            </div>

            <div className="right ml-auto">
                <div className="quantity flex   ">
                    {editable && <button className='h-5 w-5 border-4 rounded flex items-center justify-center' onClick={() => dispatch({ type: actionType.DECREASE_QUANTITY, payload: dish })}>-</button>}
                    <div className='w-5 h-5 p-1 flex items-center justify-center text-sm'>{dish.quantity}</div>
                    {editable && <button className='h-5 w-5 border-4 rounded flex items-center justify-center' onClick={() => dispatch({ type: actionType.INCREASE_QUANTITY, payload: dish })}>+</button>}

                </div>


            </div>
        </div>
    )
}

export default CartItem