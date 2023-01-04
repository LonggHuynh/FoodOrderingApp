import React from 'react'
import DishCard from './DishCard'

const Category = ({ dishes, selectItem }) => {

    return (
        <div className='mb-20'>
            <p className='text-2xl'>{dishes[0].category || `Others`}</p>
            <div className="dishContainer mt-7 grid grid-cols-[repeat(4,1fr)] gap-y-5 gap-x-5">
                {

                    dishes.map(item => <DishCard dish={item} selectItem={() => selectItem(item)}/>)
                }

            </div>

        </div>
    )
}

export default Category