import React from 'react'

const OrderCard = ({ order, selectOrder }) => {
    return (
        <div className=' h-60 flex border drop-shadow-md'>

            <div className='imgContainer flex-1 bg-slate-300'>
                <img src={order.restaurant.logo_url} className='w-full h-full object-cover' />
            </div>
            <div className='flex-[3] bg-primaryOpposite  flex  px-4 py-7'>


                <div className='flex flex-col gap-2'>
                    <p className='text-2xl'>{order.restaurant.name}</p>
                    <p className=' text-sm mt-auto'>{(order.date).slice(0, 10)}</p>
                    <p className='text-sm'>{order.address}</p>
                    <p className='text-lg'>$8.99</p>
                </div>

                <div className='ml-auto flex items-end'>
                    <button onClick={selectOrder}>View details</button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard