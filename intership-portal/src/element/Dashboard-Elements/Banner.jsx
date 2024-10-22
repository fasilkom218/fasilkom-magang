import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Banner = () => {
    const { user } = useSelector(state => state.auth)

    return (
        <div className='col-span-4 xl:col-span-full bg-gradient-to-r from-violet-200 to-slate-200 drop-shadow-xl xl:min-h-60 rounded-lg flex flex-col justify-center relative'>
            <svg xmlns="http://www.w3.org/2000/svg" className='absolute bottom-0 -z-10 opacity-10' viewBox="0 0 1440 320"><path fill="#929292" fillOpacity="1" d="M0,256L60,245.3C120,235,240,213,360,213.3C480,213,600,235,720,250.7C840,267,960,277,1080,245.3C1200,213,1320,139,1380,101.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <div className='p-4 xl:p-0'>
                <h1 className='text-center xl:mx-auto font-semibold text-2xl'>Halo, {user && user.name}👋</h1>
                <div className='sm:w-2/3 md:w-3/4 xl:w-1/2 mx-auto'>
                    <p className='hidden md:block text-center '>Our couriers have a unique set of skills. They will find you, wherever you are, and deliver your package swiftly with precision and care.</p>
                    <p className='md:hidden text-center'>Let us do all the work for you so you don’t have to.</p>
                </div>
                <div className="mt-5 flex items-center justify-center gap-x-6">
                    <a
                        href="#"
                        className="rounded-md border border-black px-3.5 py-2.5 text-sm font-semibold text-black hover:text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-colors ease-in duration-300"
                    >
                        Learn More
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Banner
