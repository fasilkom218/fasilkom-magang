import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Pengajuan = () => {
    const [btn, setBtn] = useState(null)
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border-2 border-slate-500 rounded-xl px-4 py-2'>
                <h1 className='text-xl font-bold'>Pengajuan Magang</h1>
                <p className='text-sm text-slate-500'>Upload your magang report here.</p>
                {/* Card Section */}
                <div className='mt-5'>
                    <section className='flex flex-col gap-2 justify-center items-center px-6 text-center'>
                        <h1 className='text-xl sm:text-2xl font-semibold tracking-wide mb-10'>Silahkan pilih jenis pengajuan magang yang anda inginkan.</h1>
                        <div className='flex flex-col xl:flex-row gap-4 lg:gap-8 mb-5'>
                            <button
                                onClick={() => setBtn("reguler")}
                                className='w-[19rem] self-auto sm:w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                                hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                                focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                            >
                                <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                                <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                                <BriefcaseIcon className='w-8 h-8 mt-5' />
                                <h1 className='mt-5 text-xl sm:text-2xl font-semibold text-left'>Saya ingin, mengajukan <span className='block'>magang reguler</span></h1>
                            </button>
                            <button
                                onClick={() => setBtn("kompetensi")}
                                className='w-[19rem] self-auto sm:w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                        hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                        focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                            >
                                <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                                <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                                <AcademicCapIcon className='w-8 h-8 mt-5' />
                                <h1 className='mt-5 text-xl sm:text-2xl font-semibold text-left'>Saya ingin, mengajukan <span className='block'>magang kompetensi</span></h1>
                            </button>
                        </div>
                        {btn === null ? (
                            <button disabled className='px-4 py-2 rounded-xl bg-slate-300 font-semibold cursor-not-allowed'>Ajukan magang</button>
                        ) : (
                            btn === "reguler" ? (
                                <Link to={'/dashboard/magang-reguler'}>
                                    <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>Ajukan magang reguler</button>
                                </Link>
                            ) : (
                                <Link to={'/dashboard/magang-kompetensi'}>
                                    <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>Ajukan magang kompetensi</button>
                                </Link>
                            )
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Pengajuan
