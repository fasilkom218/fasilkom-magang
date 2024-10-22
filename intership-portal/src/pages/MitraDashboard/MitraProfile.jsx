import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import FormProfileCompany from '../../Fragments/FormProfileCompany';
import blank from '../../assets/img/blank.png'

const MitraProfile = () => {
    const { user } = useSelector(state => state.auth);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Preview image before upload
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', image);

        setIsLoading(true);
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_MITRA}/upload/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message;
                return toast.error(message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='px-4'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg min-h-screen overflow-hidden'>
                <div className='h-40 xl:h-60 bg-gradient-to-r from-violet-200 to-slate-200 drop-shadow-xl flex items-center relative bg-cover bg-center' >
                    <svg xmlns="http://www.w3.org/2000/svg" className='absolute bottom-0 -z-10 opacity-10' viewBox="0 0 1440 320"><path fill="#929292" fillOpacity="1" d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,250.7C840,267,960,277,1080,245.3C1200,213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    <h1 className='text-center mx-auto font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-5xl text-slate-600 -mt-20 xl:-mt-10 opacity-60'> Halo, {user && user.name} </h1>
                    <div className='w-52 h-52 rounded-full bg-slate-50 absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className='w-44 h-44 rounded-full bg-slate-100 translate-y-4 flex items-center mx-auto overflow-hidden'>
                            <img src={user && user.profile === null ? blank : user && user.profile} alt="" className='w-34 h-34' />
                        </div>
                    </div>
                </div>
                <div className='mt-28 px-4'>
                    <h1 className='text-md font-semibold'>Personal Information</h1>
                    <p className='text-xs text-slate-500'>This information will be displayed publicly.</p>
                    <div className='mt-5'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col sm:flex-row gap-2 items-center mb-5'>
                                <div className='w-24 h-24 rounded-full mt-1 mr-2 ring-2 ring-slate-200 flex items-center justify-center overflow-hidden'>
                                    <img src={previewImage === null ? user && user.profile : previewImage} alt="" className='w-22 h-22' />
                                </div>
                                <label for="doc" className="w-full sm:w-[20%] md:w-[18%] lg:w-[10%] xl:w-[7%] flex items-center p-2 rounded-lg border border-secondary cursor-pointer text-secondary">
                                    <h4 className="text-base font-semibold self-center mx-auto">Upload</h4>
                                    <input type="file" id="doc" name="doc" accept="image/png, image/jpeg, image/jpg" hidden onChange={handleImage} />
                                </label>
                                {isLoading ? (
                                    <button disabled className='px-4 py-2 bg-secondary rounded-lg text-white font-bold w-full sm:w-24'>
                                        {isLoading ? <HashLoader color="#fff" size={25} /> : null}
                                    </button>
                                ) : (
                                    <button className='px-4 py-2 bg-secondary rounded-lg text-white font-bold w-full sm:w-24'>Submit</button>
                                )}
                            </div>
                        </form>
                        <FormProfileCompany />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MitraProfile
