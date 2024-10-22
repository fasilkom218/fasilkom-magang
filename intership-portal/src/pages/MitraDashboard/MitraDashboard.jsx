import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, Logout } from '../../redux/Action/LoginAction'
import { reset } from '../../redux/Slice/authSlice'
import { toast } from 'react-toastify'
import { IoSearchOutline } from 'react-icons/io5'
import { ArrowRightStartOnRectangleIcon, BellIcon } from '@heroicons/react/24/outline'
import Banner from '../../element/Dashboard-Elements/Banner'
import ProfileSection from '../../element/Dashboard-Elements/ProfileSection'
import MainSectionMitra from '../../element/Dashboard-Elements/MainSectionMitra'

const MitraDashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(Logout())
        dispatch(reset())
        navigate('/login-admin')
        toast.success("Logout successfully")
        setTimeout(() => {
            window.location.reload()
        }, 1500);
    }

    useEffect(() => {
        dispatch(getUser(user.token))
    }, [dispatch])

    return (
        <div>
            <div className='grid grid-cols-4 gap-10'>
                {/* Navbar Section */}
                <div className='col-span-full flex gap-2 justify-between'>
                    <div className='w-2/4 sm:w-full'>
                        <label htmlFor="search" className='relative '>
                            <span className='sr-only'>Search</span>
                            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                                <IoSearchOutline className='w-5 h-5' />
                            </span>
                            <input type="text" name="search" id='search' placeholder="Search for anything..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
                        </label>
                    </div>
                    <div className='flex gap-2 self-center'>
                        <BellIcon className='w-7 h-7 self-center' />
                        <button
                            onClick={handleLogout}
                            className='flex gap-2 px-3 py-1 bg-secondary text-white rounded-lg'>
                            <ArrowRightStartOnRectangleIcon className='w-5 self-center' />
                            <h1 className='font-semibold'>Logout</h1>
                        </button>
                    </div>
                </div>

                {/* Banner Section */}
                <Banner />

                {/* Main Section */}
                <MainSectionMitra />

                {/* Profile Section */}
                <ProfileSection />
            </div>
        </div>
    )
}

export default MitraDashboard
