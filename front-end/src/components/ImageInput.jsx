import React from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageInput = ({ image, setImage }) => {



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

        <div className="group flex justify-center items-center flex-col  border border-primary w-full h-225  cursor-pointer ">
            <>
                {!image ? (
                    <>

                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                <FileUploadIcon className="text-primary 0 text-3xl " />
                                <p className="text-primary">
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
                                alt=''
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



        </div>

    )
}

export default ImageInput