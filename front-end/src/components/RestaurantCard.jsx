import React from 'react'

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className='flex w-[450px] h-[150px] bg-primaryOpposite hover:bg-secondaryOpposite hover:border hover:drop-shadow-md'>

            <div className='flex-[5] py-3 flex  flex-col'>
                <div>
                    <p className='text-lg'>{restaurant.name}</p>
                    <p className='text-xs'>{restaurant.delivery_cost>0?restaurant.delivery_cost: `Free delivery`}</p>
                </div>
                <p className='mt-auto'>{restaurant.rating|| `No rating available`} </p>
            </div>

            <div className='image flex-[3]'>
                <img src={restaurant.logo_url} className='w-full h-full ' />

            </div>
        </div>
    )
}

export default RestaurantCard