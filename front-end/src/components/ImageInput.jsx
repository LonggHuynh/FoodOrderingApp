import React from 'react'
import { useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ClipLoader from 'react-spinners/ClipLoader'

const ImageInput = ({image, setImage}) => {


    const [isLoading, setIsLoading] = useState(false)

    const uploadImage = (e) => {

        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataUrl = e.target.result;
            setImage(dataUrl)
        };
        reader.readAsDataURL(file);
    }


    const deleteImage = () => {
        setImage(null)
    }


    return (
        <div>
            <div className="group flex justify-center items-center flex-col  border border-primary w-full h-225  cursor-pointer ">
                {isLoading ? (
                    <ClipLoader />
                ) : (
                    <>
                        {!image ? (
                            <>

                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                        <FileUploadIcon className="text-gray-500 text-3xl hover:text-gray-700" />
                                        <p className="text-gray-500 hover:text-gray-700">
                                            Upload image (1MB)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="uploadimage"
                                        accept="image/*"
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            </>
                        ) : (
                            <>
                                <div className="relative h-full">
                                    <img
                                        src={image}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                                        onClick={deleteImage}
                                    >
                                        <DeleteIcon className="text-white" />
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}



            </div>
        </div>
    )
}

export default ImageInput