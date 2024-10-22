import React, { useState } from 'react'
import blank from '../../assets/img/blank.png';
import FormProfile from '../../Fragments/FormProfile';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

const Profile = () => {
    const { user } = useSelector(state => state.loginMhs)
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const handleImage = (e) => {
        const selectedImage = e.target.files[0]
        setImage(selectedImage);

        // Preview image before upload
        const reader = new FileReader()
        reader.onload = () => {
            setPreviewImage(reader.result)
        }
        reader.readAsDataURL(selectedImage)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', image)

        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_MHS}/upload/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message
                return toast.error(message)
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                <h1 className='text-lg font-bold'>Detail Info</h1>
                <div className='mt-2'>
                    <h1 className='text-sm font-bold text-slate-600 mb-2 star-point '>Foto Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col sm:flex-row gap-2 items-center'>
                            <div className='w-24 h-24 rounded-full bg-cover bg-top mt-1 mr-3 border-2 border-black' style={{ backgroundImage: `url(${previewImage === null ? user.profile_pict : previewImage})` }}></div>
                            <label for="doc" className="w-full sm:w-[30%] md:w-[40%] lg:w-[30%] xl:w-[10%] flex items-center p-2 gap-3 rounded-lg border-2 border-secondary cursor-pointer text-secondary">
                                <h4 className="text-base font-semibold self-center mx-auto">Upload</h4>
                                <input type="file" id="doc" name="doc" accept="image/png, image/jpg, image/jpeg" hidden onChange={handleImage} />
                            </label>
                            {isLoading ? (
                                <button disabled className='px-4 py-2 bg-secondary rounded-lg text-white font-bold cursor-not-allowed'>
                                    {isLoading ? <HashLoader color="white" size={25} /> : 'Submit'}
                                </button>
                            ) : (
                                <button className='px-4 py-2 bg-secondary rounded-lg text-white font-bold'>Submit</button>
                            )}
                        </div>
                    </form>
                    <p className='text-xs mt-2 font-medium text-slate-600'>Foto profil kamu disarankan memiliki rasio 1 : 1 atau berukuran tidak lebih dari 2MB</p>
                </div>

                {/* About Info */}
                <div className=''>
                    <FormProfile user={user} />
                </div>
            </div>
        </div>
    )
}

export default Profile
