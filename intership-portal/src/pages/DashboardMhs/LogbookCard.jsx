import React, { useEffect, useState } from 'react'
import { color } from '../../assets/data/color'

const LogbookCard = ({ item }) => {
    const [titleLength, setTitleLength] = useState(25)

    useEffect(() => {
        const updateTitleLength = () => {
            if (window.innerWidth < 640) {
                setTitleLength(30)
            } else if (window.innerWidth >= 1280) {
                setTitleLength(40)
            } else {
                setTitleLength(25)
            }
        }

        updateTitleLength()

        window.addEventListener('resize', updateTitleLength)

        return () => window.removeEventListener('resize', updateTitleLength)
    }, [item.title.length])
    return (
        <>
            <div className='py-4 px-2 cursor-pointer group relative'>
                <div className='group-hover:ring-2 group-hover:ring-primary group-hover:rounded-lg'>
                    <div className='bg-[#F5F5F5] p-4 rounded-lg shadow-md shadow-slate-400 md:min-h-32 lg:min-h-24 xl:min-h-0'>
                        <div>
                            <h1 className='text-lg font-bold mb-1'>{item.title.length > titleLength ? `${item.title.substring(0, titleLength)}...` : item.title}</h1>
                            <p className='text-sm'>{item.desc.substring(0, 40)}...</p>
                        </div>
                        <div className=' mt-3 flex justify-between'>
                            <p className='text-sm font-semibold p-2 bg-black rounded-lg text-white'>{item.Mahasiswa.name}</p>
                            <p className={`text-sm font-semibold p-2 ${color[item.status]} rounded-lg text-white`}>{item.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogbookCard
