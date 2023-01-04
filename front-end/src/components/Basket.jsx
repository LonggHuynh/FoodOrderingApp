import React from 'react'
import CartItem from '../components/CartItem'
import { useSelector } from 'react-redux'

const Basket = ({ editable }) => {

    const items = useSelector(state =>state.cart.items)


    // Requires flex parent
    return (

        <div className=' basket sticky top-20 bg-primaryOpposite grow-0 shrink-0 basis-[450px] px-9 pt-10 pb-20 flex flex-col h-[calc(100vh-80px)] drop-shadow-lg'>

            <p className='self-center text-3xl  '>Basket</p>
            <div className="itemsContainer mt-10 flex flex-col gap-5">
                {items.map(item => <CartItem key={item.id} editable={editable} dish={item} />)}

            </div>

            <div className='flex mt-auto  text-sm'>
                <span >Min order </span>
                <span className='ml-auto'>$10</span>
            </div>

            <div className='flex mt-auto  text-sm'>
                <span >Dilivery cost </span>
                <span className='ml-auto'>$10</span>
            </div>

            <div className='flex mt-3 text-lg font-medium'>
                <span>Total </span>
                <span className='ml-auto'>$10</span>
            </div>

            {editable && <button className='text-lg mt-10  text-primaryOpposite bg-primary border rounded-lg py-2 '>Check out</button>}
        </div>

    )
}

export default Basket