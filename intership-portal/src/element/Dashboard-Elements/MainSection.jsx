import React, { useEffect, useState } from 'react'
import DataNotFound from '../../components/DataNotFound'
import people from '../../assets/img/people-6.jpg'
import { AdjustmentsHorizontalIcon, ArrowLongRightIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import Cards from '../../components/Cards'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { getApplicant } from '../../redux/Action/ApplicantAction'
import { getJob } from '../../redux/Action/CreateJobAction'
import blank from '../../assets/img/blank.png'

const MainSection = () => {
    const dispatch = useDispatch()
    const { applicant } = useSelector(state => state.app)
    const { isLoading, job } = useSelector(state => state.job)
    const { user } = useSelector(state => state.auth)
    const [sum, setSum] = useState(0)
    const data = Array.isArray(job) ? job.slice(0, 2) : []
    const list = Array.isArray(applicant) ? applicant.slice(0, sum) : []

    useEffect(() => {
        dispatch(getApplicant(user.token))
        dispatch(getJob(user.token))
    }, [dispatch])

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth < 1280) {
                setSum(3)
            } else {
                setSum(4)
            }
        }

        handleSize()
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize)
    }, [])
    return (
        <div className='col-span-4 xl:col-span-3 row-span-2 bg-slate-100 drop-shadow-xl min-h-56 rounded-lg'>
            <div className='flex flex-col gap-10 p-2 sm:px-8 sm:py-4'>
                <div className='min-h-56'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 self-center'>
                            <AdjustmentsHorizontalIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Active Job</h1>
                        </div>
                        <Link to={'/company-dashboard/internship'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <button className='text-sm font-semibold'>View More</button>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </Link>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            data.length > 0 ? (
                                data.map(item => (
                                    <Cards key={item.id} {...item} />
                                ))
                            ) : (
                                <DataNotFound>
                                    No Job Available
                                </DataNotFound>
                            )
                        )}
                    </div>
                </div>
                <div className='min-h-56 flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UsersIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Applicant</h1>
                        </div>
                        <Link to={'/company-dashboard/applicant'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <p className='text-sm font-semibold'>View More</p>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-between'>
                        {isLoading ? (
                            <div className='mx-auto'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            list.length > 0 ? (
                                list.map(item => (
                                    <div className='w-48 md:w-52 h-52 px-2 bg-slate-200 flex flex-col justify-center items-center rounded-lg gap-2' key={item.id}>
                                        <div className={`w-24 h-24 rounded-full bg-slate-100 overflow-hidden flex items-center ${item.Mahasiswa.profile_pict ? '' : 'border-2 border-slate-300'}`}
                                            style={{ backgroundImage: `url(${item.Mahasiswa.profile_pict ? item.Mahasiswa.profile_pict : blank})` }}
                                        />
                                        <div className='text-center'>
                                            <h1 className='text-lg font-semibold'>{item.Mahasiswa.name}</h1>
                                            <h2 className='text-md -mt-1'>{item.job.jobTitle}</h2>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='mx-auto'>
                                    <DataNotFound>
                                        No Applicant Available
                                    </DataNotFound>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection
