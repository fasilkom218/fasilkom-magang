import React, { useEffect, useState } from 'react'
import { RiPushpin2Line } from 'react-icons/ri'
import { foramterDate } from '../../utils/formaterDate'

const InformationCard = ({ item }) => {
  const [size, setSize] = useState({
    title: 25,
    desc: 35
  })

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 900) {
        setSize({
          title: 20,
          desc: 28
        })
      } else if (window.innerWidth >= 300 && window.innerWidth <= 400) {
        setSize({
          title: 19,
          desc: 25
        })
      }
    }

    handleSize()
    window.addEventListener('resize', handleSize)
    return () => window.removeEventListener('resize', handleSize)
  }, [])
  return (
    <div className='min-w-80 py-4 px-2 cursor-pointer group relative'>
      <div className='group-hover:ring-2 group-hover:ring-primary group-hover:rounded-lg'>
        <div className='bg-[#F5F5F5] p-2 rounded-lg shadow-md shadow-slate-400 group-hover:blur-sm group-hover:backdrop-brightness-70'>
          <div>
            <h1 className='text-lg font-bold mb-1'>{item.title.length > size.title ? `${item.title.substring(0, size.title)}...` : item.title}</h1>
            <p className='text-sm'
              dangerouslySetInnerHTML={{
                __html: item.desc.length > size.desc ?
                  `${item.desc.substring(0, size.desc)}...` : item.desc
              }} />
          </div>
          <div className='flex justify-between mt-3'>
            <p className='text-sm font-semibold'>{foramterDate(item.createdAt)}</p>
            <RiPushpin2Line className='text-2xl font-semibold' />
          </div>
        </div>
      </div>
      <div className='hidden group-hover:flex absolute inset-0 items-center justify-center font-semibold'>Click to see more</div>
    </div>
  )
}

export default InformationCard
