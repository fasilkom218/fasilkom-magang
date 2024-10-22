import React from 'react'
import office from '../../assets/img/meet.jpg'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Marquee from 'react-fast-marquee'
import { company1 } from '../../assets/data/company'
import { Link } from 'react-router-dom'

const HeroSection = () => {
    return (
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-5'>
            <div className='col-span-full lg:col-span-3 min-h-32 relative'>
                <h1 className='text-3xl sm:text-5xl font-extrabold tracking-wide sm:leading-[3.5rem] text-center sm:text-left'>Grow your skill <span className='block'>and advance your </span>career with Fasilkom</h1>
                <p className='py-2 sm:w-[80%] text-center sm:text-left'>Enhance your expertise and elevate your career with Fasilkom, where growth and opportunities align to fuel your success.</p>
                <div className='flex gap-3 justify-center sm:justify-start'>
                    <Link to={'/started'}>
                        <button className='px-4 xl:px-6 py-2 bg-black font-semibold text-white flex gap-2 rounded-lg'>
                            <p>Get Started</p>
                            <ArrowRightIcon className='w-5 h-5 self-center' />
                        </button>
                    </Link>
                    <Link to={'/contact'}>
                        <button className='px-4 xl:px-6 py-2 border-2 border-black font-semibold text-black flex gap-2 rounded-lg hover:bg-black hover:text-white transition-colors ease-in-out duration-200'>
                            Contact Support
                        </button>
                    </Link>
                </div>
                <div className="hidden sm:stats sm:stats-horizontal mt-5">
                    <div className="stat pl-0">
                        <div className="stat-title">Downloads</div>
                        <div className="stat-value">31K</div>
                        <div className="stat-desc">Jan 1st - Sep 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">New Users</div>
                        <div className="stat-value">4,200</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">New Hiring Partner</div>
                        <div className="stat-value">200</div>
                        <div className="stat-desc">↗︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
            <div className='col-span-full lg:col-span-2 min-h-32 flex items-center mt-5 sm:mt-10 lg:mt-0 sm:px-4 xl:px-0'>
                <div className='w-[90%] sm:w-[80%] lg:w-[90%] xl:w[80%] h-96 border-2 border-slate-400 bg-white bg-cover bg-center mx-auto rounded-2xl relative drop-shadow-2xl' style={{ backgroundImage: `url(${office})` }}>
                    <div className='w-52 sm:h-32 bg-gradient-to-tl from-pink-100 via-neutral-100 to-slate-100 border-2 border-slate-400 absolute top-1 -left-5 sm:-top-5 sm:-left-20 rounded-lg'>
                        <div className="stats">
                            <div className="stat">
                                <div className="stat-title text-sm sm:text-lg">Total Page Views</div>
                                <div className="stat-value text-lg sm:text-2xl">89,400</div>
                                <div className="stat-desc text-sm sm:text-md">21% more than last month</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-52 sm:h-32 bg-gradient-to-tl from-pink-100 via-neutral-100 to-slate-100 border-2 border-slate-400 absolute bottom-1 -right-5 sm:-bottom-5 sm:-right-20 lg:-right-10 xl:-right-20 rounded-lg'>
                        <div className="stats">
                            <div className="stat">
                                <div className="stat-title text-sm sm:text-lg">Total Active Users</div>
                                <div className="stat-value text-lg sm:text-2xl">10,200</div>
                                <div className="stat-desc text-sm sm:text-md">11% more than last month</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='col-span-full mt-5 '>
                <Marquee autoFill pauseOnHover>
                    {company1.map((item, index) => (
                        <div key={item.id} className="p-4 pb-0">
                            <img src={item.img} alt="" width={150} className='image-filter' />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default HeroSection
