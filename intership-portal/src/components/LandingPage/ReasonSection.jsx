import React from 'react'
import reason2 from '../../assets/data/Reason'

const ReasonSection = () => {
    return (
        <div>
            <h1 className='text-3xl font-extrabold'>Discover the top reasons to <span className='sm:block lg:inline'>kickstart your career</span></h1>
            <p className='mt-1 text-slate-500 font-medium sm:w-[90%] md:w-[80%] xl:w-[70%]'>Explore the key reasons why our platform is the ideal place to kickstart your career, offering unmatched opportunities and a seamless experience tailored for your growth.</p>
            <div className='mt-4 flex gap-4 flex-wrap sm:justify-center md:justify-between lg:justify-center '>
                {reason2.map(item => (
                    <div className='w-96 min-h-48 rounded-lg p-4 mb-2 bg-white drop-shadow-lg' key={item.id}>
                        <div className='flex flex-col gap-2'>
                            <div className='w-12 h-12 rounded-full bg-secondary bg-opacity-10 flex items-center'>
                                {item.icon}
                            </div>
                            <h1 className='text-xl font-bold'>{item.title}</h1>
                            <p className='text-md text-slate-500'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReasonSection
