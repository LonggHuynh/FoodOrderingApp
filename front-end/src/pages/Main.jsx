import React from 'react'
import RestaurantCard from '../components/RestaurantCard'
import SearchIcon from '@mui/icons-material/Search';
import { Switch } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import url from '../config/api'
const Main = () => {
    const [isDeliveryFree, setIsDeliveryFree] = useState(false)
    const [minOrder, setMinOrder] = useState(Infinity)
    const [searchTerm, setSearchTerm] = useState('')



    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])


    useEffect(() => {
        setFilteredRestaurants(restaurants.filter(restaurant => (!isDeliveryFree || restaurant.delivery_cost === 0) && (restaurant.min_order <= minOrder) && restaurant.name.toUpperCase().includes(searchTerm.toUpperCase())))
    }, [restaurants, searchTerm, minOrder, isDeliveryFree])



    useEffect(() => {

        fetch(url('/restaurants'))
            .then(response => response.json())
            .then(data => setRestaurants(data.data))
    }, [])




    return (

        <>

            <div className='mainContainer flex'>
                <div className="sideBar bg-primaryOpposite flex-1 px-10 py-14 sticky top-20 flex flex-col gap-10 drop-shadow-lg  h-[calc(100vh-80px)]">
                    <p className='text-xl '>{restaurants.length} restaurants</p>




                    <div className='filterItem mt-8'>
                        <p className='text-3xl '>Free Delivery</p>
                        <Switch
                            checked={isDeliveryFree}
                            onChange={() => setIsDeliveryFree(prev => !prev)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>


                    <div className='filterItem mt-8'>
                        <p className='text-3xl mb-3 '>Min Order</p>
                        <div className='inputItem mb-2'>
                            <input type='radio' id='10' value={10} name='price' onChange={(e) => setMinOrder(e.target.value)} />
                            <label className='ml-3' htmlFor='10'> $10</label>
                        </div>

                        <div className='inputItem mb-2' >
                            <input type='radio' id='20' value={20} name='price' onChange={(e) => setMinOrder(e.target.value)} />
                            <label className='ml-3' htmlFor='20'> $20 </label>
                        </div>

                        <div className='inputItem mb-2' >
                            <input type='radio' id='all' value={Infinity} name='price' onChange={(e) => setMinOrder(e.target.value)} />
                            <label className='ml-3' htmlFor='all'> All</label>
                        </div>
                    </div>



                </div>


                <div className="list flex-[5]  py-14 pl-14 pr-32 min-h-screen">

                    <div className='w-full h-60 '>
                        <img className='w-full h-full object-cover object-center' alt='' src='https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg' />
                    </div>
                    <div className="searchAndSort flex gap-10 mt-20">
                        <div className='searchBar border-2 rounded px-4 py-2 flex gap-3 items-center flex-[2]'>
                            <p>
                                <SearchIcon />
                            </p>
                            <input type='text' className='w-full p-2 text-lg border-none focus:outline-none' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>

                        <div className='sort flex-1 border-2 rounded'>
                            <select
                                className="outline-none w-full bg-white p-4 cursor-pointer"
                            >
                                <option value="rating" className="bg-white">
                                    Highest rating
                                </option>
                            </select>

                        </div>
                    </div>

                    <div className='mt-10'>
                        <p className='text-xl'>{filteredRestaurants.length} restaurants</p>
                    </div>
                    <div className="cardGrid flex flex-wrap gap-x-32 gap-y-10 mt-5">
                        {filteredRestaurants.map(item =>
                            <Link key={item.id} to={{ pathname: `/restaurants/${item.id}`, state: { restaurant: item } }}>
                                <RestaurantCard restaurant={item} />
                            </Link>
                        )}

                    </div>
                </div>

            </div >
        </>
    )
}

export default Main