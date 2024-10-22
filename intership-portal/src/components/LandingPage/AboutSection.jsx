import React from 'react'
import teamwork from '../../assets/img/teamwork.jpg'
import teamwork2 from '../../assets/img/teamwork2.jpg'

const AboutSection = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
            <div className='lg:col-span-2 min-h-32 flex flex-col items-center justify-center'>
                <div>
                    <h1 className='text-3xl font-extrabold leading-[2.5rem]'>We didn't overhaul, we just <span className='sm:block'>made internships effortless.</span></h1>
                    <p className='mt-1 md:w-[80%] lg:w-[90%]'>We didn’t set out to revolutionize the entire system; we focused on refining the details, creating a seamless, stress-free experience that makes finding internships easier, quicker, and more intuitive for everyone.</p>
                    <p className='mt-3 md:w-[80%] lg:w-[90%]'>Our goal wasn’t to disrupt, but to enhance—making every step in the internship search process as smooth as possible.</p>
                </div>
            </div>
            <div className='lg:col-span-2 min-h-32 flex items-center gap-4 justify-center'>
                <div className='w-64 h-80 bg-black -my-16 rounded-lg bg-cover bg-top drop-shadow-xl' style={{ backgroundImage: `url(${teamwork})` }}></div>
                <div className='w-64 h-80 bg-black mt-16 rounded-lg bg-cover bg-top drop-shadow-xl' style={{ backgroundImage: `url(${teamwork2})` }}></div>
            </div>
        </div>
    )
}

export default AboutSection
