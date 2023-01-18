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
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import EditRestaurantCard from '../components/EditRestaurantCard';
import EditDish from '../components/EditDish'
import { useSelector } from 'react-redux';


const Restaurant = () => {

  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [selectedDish, setSelectedDish] = useState(null)
  const [editRestaurant, setEditRestaurant] = useState(false)
  const [addDish, setAddDish] = useState(false)


  const uid = useSelector(state => state.user?.uid)




  //classified by tag
  const [categoriedDishes, setCategoriedDishes] = useState()

  useEffect(() => {
    fetch((url(`/restaurants/${id}`)))
      .then(response => response.json())
      .then(data => setRestaurant(data.data))
  }, [id])



  useEffect(() => {

    if (restaurant) {
      let { dishes } = restaurant
      dishes = dishes || []
      const categoriesMap = new Map()
      const others = []


      dishes = dishes.filter(item => item);




      dishes.forEach(dish => {
        if (!categoriesMap.get(dish.category))
          categoriesMap.set(dish.category, [])
        categoriesMap.get(dish.category).push(dish)
      })


      const res = []

      categoriesMap.forEach((categoriedDish, _) => res.push(categoriedDish))


      if (others.length > 0) res.push(others)
      setCategoriedDishes(res)
    }


  }, [restaurant])
  return (


    restaurant ?

      <>
        {selectedDish && <ItemModal dish={selectedDish} restaurant={restaurant} close={() => setSelectedDish(null)} />}
        {editRestaurant && <EditRestaurantCard action='Edit' restaurant={restaurant} closeTab={() => setEditRestaurant(false)} />}
        {addDish && <EditDish action='Add dish' closeTab={() => setAddDish(false)} />}
        <div className='flex'>

          <div className="mainPage flex-1 basis-0 relative">

            <div className='backGround h-[400px] bg-primaryOpposite drop-shadow-lg'>
              <div className="img bg-red-400 h-[60%] drop-shadow-md" >
                <img src={restaurant.background_url} alt='' className='w-full h-full object-cover'  />
              </div>
              <div className="details px-10 py-5 flex flex-col  h-[40%] relative" >

                <div className='w-28 h-28 bg-white absolute -top-24 left-8'>
                  <img className='w-full h-full object-cover' alt='' src={restaurant.logo_url} />
                </div>
                <div className='flex items-center'>
                  <p className='text-4xl font-semibold'>{restaurant.name}</p>
                  <div className='ml-auto cursor-pointer flex gap-3' >
                    {uid === restaurant.id && <EditIcon onClick={() => setEditRestaurant(true)} />}
                    {uid === restaurant.id && <AddIcon onClick={() => setAddDish(true)} />}

                  </div>
                </div>

                <div className='flex mt-auto'>

                  {
                    restaurant.rating ?
                      <>
                        {[...Array(5).keys()].map(val => val + 0.5 <= restaurant.rating ? <StarIcon key={val} /> : <StarBorderIcon key={val} />)}
                        <span className='ml-1'> ({restaurant.order_count})</span>
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
                  categoriedDishes.map((item, ind) => <Category key={ind} dishes={item} selectItem={(item) => setSelectedDish(item)} />)
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