import React, { useEffect } from 'react'
import { CalendarIcon, MapPinIcon, PhoneArrowUpRightIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import { foramterDate } from '../../utils/formaterDate'
import blank from '../../assets/img/blank.png'

const ProfileSection = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <div className='col-span-4 lg:col-span-2 lg:row-start-5 xl:col-start-4 xl:row-start-3 xl:col-span-1 bg-slate-100 drop-shadow-xl min-h-56 rounded-lg p-4 overflow-hidden'>
            <div className='flex flex-col gap-3 w-full'>
                <div className='mx-auto w-32 h-28 rounded-lg bg-cover bg-center'
                    style={{
                        backgroundImage: `url(${user && user.profile !== null ? user.profile : blank})`
                    }}
                />
                <div className='w-[58%] self-center text-center'>
                    <h1 className='text-md font-semibold'>{user && user.name}</h1>
                    <p className='text-sm'>{user && user.email}</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 mt-5'>
                <div className='flex gap-2'>
                    <UsersIcon className='w-6 h-6 text-slate-500' />
                    <h1 className='text-md font-semibold capitalize'>{user && user.role}</h1>
                </div>
                <div className='flex gap-2'>
                    <CalendarIcon className='w-6 h-6 text-slate-500' />
                    <h1 className='text-md font-semibold'>{foramterDate(user && user.createdAt)}</h1>
                </div>
                <div className='flex gap-2'>
                    <PhoneArrowUpRightIcon className='w-6 h-6 text-slate-500' />
                    <h1 className='text-md font-semibold'>{user && user.no_telpon === null ? 'No Data' : user.no_telpon}</h1>
                </div>
                <div className='flex gap-2'>
                    <MapPinIcon className='w-6 h-6 text-slate-500' />
                    <h1 className='text-md font-semibold'>{user && user.alamat === null ? 'No Data' : user.alamat}</h1>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection
