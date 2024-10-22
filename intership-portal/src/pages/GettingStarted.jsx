import React, { useState } from 'react'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'

const GettingStarted = () => {
    const [btn, setBtn] = useState(null)
    return (
        <div>
            <Navbar show={'navbar'} />
            <section className='flex flex-col gap-2 justify-center items-center px-6 xl:px-0 text-center'>
                <h1 className='text-4xl font-semibold tracking-wide mb-10'>Join as a company or student</h1>
                <div className='flex flex-col md:flex-row gap-4 lg:gap-8 mb-5'>
                    <button
                        onClick={() => setBtn("company")}
                        className='w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                                hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                                focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                    >
                        <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                        <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                        <BriefcaseIcon className='w-8 h-8 mt-5' />
                        <h1 className='mt-5 text-2xl font-semibold text-left'>I'm a admin, manage <span className='block'>portal internship</span></h1>
                    </button>
                    <button
                        onClick={() => setBtn("student")}
                        className='w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                        hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                        focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                    >
                        <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                        <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                        <AcademicCapIcon className='w-8 h-8 mt-5' />
                        <h1 className='mt-5 text-2xl font-semibold text-left'>I'm a student, looking <span className='block'>for a internship</span></h1>
                    </button>
                </div>
                {btn === null ? (
                    <button disabled className='px-4 py-2 rounded-xl bg-slate-300 font-semibold cursor-not-allowed'>Create account</button>
                ) : (
                    btn === "company" ? (
                        <Link to={'/login-admin'}>
                            <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>Join as a company</button>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>Apply as a student</button>
                        </Link>
                    )
                )}
                <p>Already have an account? <Link to={'/login'} className='text-blue-500 font-semibold'>Login</Link></p>
            </section>
        </div>
    )
}

export default GettingStarted
