import React, { useEffect } from 'react'
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getApply, getJob } from '../../redux/Action/ApplyJobAction';
import laporan from '../../assets/img/laporan.jpg'
import bimbingan from '../../assets/img/bimbingan.jpg'
import logbook from '../../assets/img/logbook.jpg'
import pengajuan from '../../assets/img/pengajuan.jpg'
import { getMhs } from '../../redux/Action/LoginMhsAction';

const color = {
    "applied": "bg-blue-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
}

const QuickPath = [
    {
        id: 1,
        title: "Logbook Magang",
        img: logbook,
        path: "/dashboard/logbook",
    },
    {
        id: 2,
        title: "Laporan Magang",
        img: laporan,
        path: "/dashboard/laporan-magang",
    },
    {
        id: 3,
        title: "Bimbingan Magang",
        img: bimbingan,
        path: "/dashboard/bimbingan",
    },
    {
        id: 4,
        title: "Pengajuan Magang",
        img: pengajuan,
        path: "/dashboard/pengajuan-magang",
    },
]

const Dashboard = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)

    useEffect(() => {
        dispatch(getMhs(user.token))
    }, [dispatch])
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='bg-neutral-500 rounded-lg drop-shadow-lg px-8 py-6'>
                <h1 className='text-2xl font-bold text-white'>Hallo, {user && user.name} !</h1>
                <p className='text-md mb-10 text-white'>These are your internship statistics, keep up the good work.</p>
                <div className='flex flex-col lg:flex-row gap-4 flex-wrap justify-between bg-white px-4 lg:px-6 py-4 rounded-lg'>
                    <div className='lg:w-[30%] flex gap-2 justify-between border-b-2 border-slate-400 lg:block lg:border-none'>
                        <div className='flex gap-2 lg:justify-between lg:border-b-2 lg:border-slate-400'>
                            <h1 className='text-md lg:text-lg font-semibold'>Program Studi</h1>
                            <IoIosStar className='text-lg mt-1' />
                        </div>
                        <h1 className='text-md lg:text-lg font-semibold'>{user.prodi}</h1>
                    </div>
                    <div className='lg:w-[30%] flex gap-2 justify-between border-b-2 border-slate-400 lg:block lg:border-none'>
                        <div className='flex gap-2 lg:justify-between lg:border-b-2 lg:border-slate-400'>
                            <h1 className='text-md lg:text-lg font-semibold'>NPM</h1>
                            <IoIosStar className='text-lg mt-1' />
                        </div>
                        <h1 className='text-md lg:text-lg font-semibold'>{user.npm}</h1>
                    </div>
                    <div className='lg:w-[30%] flex gap-2 justify-between border-b-2 border-slate-400 lg:block lg:border-none'>
                        <div className='flex gap-2 lg:justify-between lg:border-b-2 lg:border-slate-400'>
                            <h1 className='text-md lg:text-lg font-semibold'>Nomor HP</h1>
                            <IoIosStar className='text-lg mt-1' />
                        </div>
                        <h1 className='text-md lg:text-lg font-semibold'>{user.no_hp}</h1>
                    </div>

                </div>
            </div>

            <div className='mt-5'>
                <h1 className='text-xl font-semibold'>Quick Access</h1>
                <div className='mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 '>
                    {QuickPath.map(item => (
                        <div className='w-56 h-64 rounded-lg border-2 border-black p-2 shadow-2xl' key={item.id}>
                            <div className='w-full h-32 bg-black rounded-lg bg-cover bg-center' style={{ backgroundImage: `url(${item.img})` }} />
                            <div className='flex flex-col gap-1 justify-center items-center mt-5'>
                                <h1 className='font-bold text-lg'>{item.title}</h1>
                                <a href={item.path}>
                                    <button className='px-4 py-2 bg-black text-white font-semibold rounded-lg'>View Detail</button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
