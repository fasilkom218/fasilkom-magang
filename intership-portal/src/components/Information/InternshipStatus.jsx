import React, { useEffect } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaMoneyCheck } from "react-icons/fa";
import { PiBagFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { getApply } from '../../redux/Action/ApplyJobAction';
import { HashLoader } from 'react-spinners';
import DataNotFound from '../DataNotFound';

const color = {
    "applied": "bg-blue-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
    "canceled": "bg-orange-500",
}

const InternshipStatus = ({ token }) => {
    const dispatch = useDispatch()
    const { isLoading, applied } = useSelector(state => state.jobMhs)

    useEffect(() => {
        dispatch(getApply(token))
    }, [dispatch])
    return (
        <section className='min-h-20 rounded-md'>
            <h1 className='text-xl font-extrabold mb-2'>Internship Status</h1>
            <div className='grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-4'>
                {isLoading ? (
                    <div className='col-span-full mx-auto'>
                        <HashLoader size={50} color='#ce231c' />
                    </div>
                ) : (
                    applied && applied.length > 0 ? (
                        applied.map(item => (
                            <div className='bg-[#F5F5F5] px-2 py-2 rounded-md drop-shadow-lg sm:flex sm:justify-between mb-2' key={item.id}>
                                <div className='flex gap-2'>
                                    <div className='w-20 bg-white border-slate-300 rounded-md flex px-1'>
                                        <img src={item.User.profile === null ? "https://via.placeholder.com/150"
                                            : item.User.profile} alt={item.User.name} className='self-center'
                                        />
                                    </div>
                                    <div>
                                        <h1 className='text-lg font-semibold'>{item.job.jobTitle}</h1>
                                        <div className='flex gap-2 flex-wrap'>
                                            <div className='flex gap-1'>
                                                <IoLocationSharp className='text-sm mt-1' />
                                                <h2 className='text-sm'>{item.User.alamat}</h2>
                                            </div>
                                            <div className='flex gap-1'>
                                                <FaMoneyCheck className='text-sm mt-1' />
                                                <h2 className='text-sm'>{item.job.salary.toLocaleString('id-ID')}</h2>
                                            </div>
                                            <div className='flex gap-1'>
                                                <PiBagFill className='text-sm mt-1' />
                                                <h2 className='text-sm'>{item.job.jobType}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`text-white px-4 py-1 rounded-lg mt-2 text-center font-semibold sm:h-8 self-center ${color[item.status]}`}>{item.status}</div>
                            </div>
                        ))
                    ) : (
                        <DataNotFound>
                            No Internship Applied
                        </DataNotFound>
                    )
                )}
            </div>
        </section>
    )
}

export default InternshipStatus
