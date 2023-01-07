import React, { useEffect, useState } from 'react'

import Category from '../components/Category'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Basket from '../components/Basket';
import ItemModal from '../components/ItemModal';
import url from '../config/api'
import { useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

const Restaurant = () => {

  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)


  console.log(selectedDish)

  //classified by tag
  const [categoriedDishes, setCategoriedDishes] = useState()

  useEffect(() => {
    fetch((url(`/restaurants/${id}`)))
      .then(response => response.json())
      .then(data => setRestaurant(data.data))
  }, [])


  useEffect(() => {

    if (restaurant) {
      const { dishes } = restaurant
      const categories = new Map()
      const others = []
      dishes.forEach(dish => {
        if (!dish.catagory) others.push(dish)
        else {
          if (!categories[dish.catagory]) categories[dish.catagory] = []
          categories[dish.catagory].push(dish)
        }
      })

      const res = Array.from(categories.values())
      if (others.length > 0) res.push(others)
      setCategoriedDishes(res)
    }

  }, [restaurant])
  return (


    restaurant ?

      <>
        {selectedDish && <ItemModal dish={selectedDish} restaurant={restaurant} close={() => setSelectedDish(null)} />}

        <div className='flex'>

          <div className="mainPage flex-1 basis-0 relative">

            <div className='backGround h-[400px] bg-primaryOpposite drop-shadow-lg'>
              <div className="img bg-red-400 h-[60%] drop-shadow-md">
                <img src={restaurant.background_url} className='w-full h-full object-cover' />
              </div>
              <div className="details px-10 py-5 flex flex-col  h-[40%]" >
                <p className='text-4xl font-semibold'>{restaurant.name}</p>

                <div className='flex mt-auto'>

                  {
                    restaurant.rating ?
                      <>
                        {[...Array(5).keys()].map(val => val + 0.5 <= restaurant.rating ? <StarIcon key={val} /> : <StarBorderIcon key={val} />)}
                        <span className='ml-1'> (500)</span>
                      </> :
                      <>
                        <p>Rating not available</p>
                      </>
                  }



                </div>
                <p className='text'>Min. ${restaurant.min_order} <span className='ml-3'><DeliveryDiningIcon />.</span> ${restaurant.delivery_cost}</p>
              </div>

            </div>

            <div className="dishes px-10 py-20">

              {
                categoriedDishes ?
                  categoriedDishes.map(item => <Category dishes={item} selectItem={(item) => setSelectedDish(item)} />)
                  :
                  <div className='flex h-full  items-center justify-center'>
                    <ClipLoader />
                  </div>
              }

            </div>
          </div>
          <Basket editable={true} />
        </div>
      </>
      :
      <div className=' flex items-center justify-center h-screen'>
        <ClipLoader />
      </div>

  )
}

export default Restaurant