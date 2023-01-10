import React from 'react'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import ImageInput from './ImageInput';
import CloseIcon from '@mui/icons-material/Close';
import url from '../config/api'

const EditDish = ({ action, closeTab, dish, categories }) => {



    const [data, setData] = useState({ id: dish?.id, name: dish?.name || '', price: dish?.price || 0, description: dish?.description || '', category: dish?.category || '' })
    const [img, setImg] = useState(dish?.img)

    const { accessToken } = useSelector(state => state.user)








    const handleSubmit = (e) => {
        e.preventDefault()



        fetch(url('/dishes'), {
            method: action === 'Add dish' ? 'POST' : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ ...data, img: img })
        })
            .then(async (response) => {
                const data = await response.json()
                if (!response.ok) {
                    throw new Error(data.msg)
                }

            }).then(() => window.location.reload())
            .catch((error) => toast.error(error.message))

        //Fetch!!

    }



    const handleChange = (e) => setData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));



    return (
        <>

            <div className='selectedItem fixed w-screen h-screen flex items-center justify-center z-[3] left-0 top-0 bg-primary bg-opacity-50 py-8' onClick={closeTab}>
                <div className='relative w-[26vw] bg-white h-[90vh] flex flex-col rounded-sm text-primary' onClick={e => e.stopPropagation()} >

                    <div className='absolute top-3 right-3 cursor-pointer' onClick={closeTab}>
                        <CloseIcon />
                    </div>

                    <p className='mt-14 text-3xl text-center '>{action}</p>



                    <div className='px-4 mt-16 overflow-y-scroll scrollbar-w-[3px]'>
                        <form className='flex flex-col gap-10 mb-10 ' >
                            <input className='border-b text-xl focus:outline-none' type='text' placeholder='Dish name' name='name' onChange={handleChange} value={data.name} />


                            <div>
                                <p>Background</p>
                                <ImageInput image={img} setImage={setImg} />
                            </div>



                            <div>
                                <p>Description</p>
                                <textarea rows="5" placeholder='Min order' onChange={handleChange} name='description' className='border border-primary p-2  w-full' value={data.description} />

                            </div>

                            <input type='number' placeholder='Price' onChange={handleChange} name='price' className='border-b focus:outline-none' value={data.price} />



                            <div>
                                <p>Category</p>

                                <input type="text" list="cars" className='w-full border-b focus:outline-none px-2 py-1' name='category' value={data.category} onChange={handleChange} />
                                <datalist id="cars"   >
                                    {categories?.map(item => <option className='w-full'>{item}</option>)}

                                </datalist>
                            </div>

                        </form>
                    </div>







                    <button className='mt-auto h-[10%] bg-primary text-primaryOpposite p-3 text-lg semi-bold' onClick={handleSubmit}>
                        {action}
                    </button>



                </div>




            </div>


        </>
    )
}

export default EditDish