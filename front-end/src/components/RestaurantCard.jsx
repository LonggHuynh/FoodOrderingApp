import React from 'react'

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className='flex w-[600px] h-[200px] bg-primaryOpposite cursor-pointer hover:bg-secondaryOpposite hover:border hover:drop-shadow-md'>

            <div className='flex-[5] py-3 px-3 flex  flex-col'>
                <div>
                    <p className='text-xl'>{restaurant.name}</p>
                    <p className='text-md'>{restaurant.delivery_cost > 0 ? `$ ${restaurant.delivery_cost}` : `Free delivery`}</p>
                </div>
                {restaurant.rating ?
                    <div className='flex mt-auto'>
                        <div className='  self-start flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white'> {restaurant.rating}</div>
                        <div className='flex items-center justify-center ml-2 text-sm'>({restaurant.order_count})</div>

                    </div>
                    :
                    <p className='mt-auto'>{`No rating available`} </p>}
            </div>

            <div className='image flex-[3] bg-white'>
                <img src={restaurant.logo_url} alt='' className='w-full h-full ' />

            </div>
        </div>
    )
}

export default RestaurantCard