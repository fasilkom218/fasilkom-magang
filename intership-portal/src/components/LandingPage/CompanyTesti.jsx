import React from 'react'
import Marquee from 'react-fast-marquee'
import { testi, testi2 } from '../../assets/data/company'
import { Link } from 'react-router-dom'

const CompanyTesti = () => {
    return (
        <div className='grid grid-cols-1 gap-3 md:grid-cols-4'>
            <div className='col-span-2 min-h-32 flex items-center'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl font-extrabold'>Trusted By 200+ Company</h1>
                    <h1 className='text-2xl font-bold'>Insights From Our Trusted <span className='block'>Corporate Collaborators 🌟</span></h1>
                    <p className='sm:w-[80%] md:w-[100%] lg:w-[80%]'>Get valuable insights from our trusted corporate collaborators on how their expertise has fueled our shared success.</p>
                    <div className='flex gap-2'>
                        <Link to={"/started"}>
                            <button className='px-4 xl:px-6 py-2 bg-black drop-shadow-lg font-semibold text-white flex gap-2 rounded-lg'>Sign Up</button>
                        </Link>
                        <button className='px-4 xl:px-6 py-2 border-2 border-black font-semibold text-black flex gap-2 rounded-lg hover:bg-black hover:text-white transition-colors ease-in-out duration-200'>Learn More</button>
                    </div>
                </div>
            </div>
            <div className='col-span-2 min-h-80 rounded-lg '>
                <div className='flex flex-wrap gap-4 justify-center'>
                    <Marquee pauseOnHover autoFill speed={80}>
                        {testi.map(item => (
                            <div className='p-4' key={item.id}>
                                <div className='w-72 min-h-32 bg-[#f5f5f5] drop-shadow-lg rounded-lg'>
                                    <div className='flex flex-col gap-3 p-2 '>
                                        <div className='flex gap-3'>
                                            <div className='w-14 h-10 bg-[#f5f5f5] rounded-lg drop-shadow-md flex items-center'>
                                                <img src={item.img} alt="" className='w-full mx-auto' />
                                            </div>
                                            <div className='flex flex-col'>
                                                <h1 className='text-md font-semibold'>{item.name}</h1>
                                                <h2 className='text-sm font-medium -mt-1 '>{item.email}</h2>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className='text-lg font-bold'>{item.status}</h1>
                                            <p className='font-medium'>{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                    <Marquee pauseOnHover autoFill direction='right' speed={70}>
                        {testi2.map(item => (
                            <div className='p-4 pt-0' key={item.id}>
                                <div className='w-72 min-h-32 bg-[#f5f5f5] drop-shadow-lg rounded-lg'>
                                    <div className='flex flex-col gap-3 p-2 '>
                                        <div className='flex gap-3'>
                                            <div className='w-14 h-10 bg-[#f5f5f5] rounded-lg drop-shadow-md flex items-center'>
                                                <img src={item.img} alt="" className='w-full mx-auto' />
                                            </div>
                                            <div className='flex flex-col'>
                                                <h1 className='text-md font-semibold'>{item.name}</h1>
                                                <h2 className='text-sm font-medium -mt-1 '>{item.email}</h2>
                                            </div>
                                        </div>
                                        <div>
                                            <h1 className='text-lg font-bold'>{item.status}</h1>
                                            <p className='font-medium'>{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default CompanyTesti
