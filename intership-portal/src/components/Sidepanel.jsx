import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PanelElemen from '../element/JobDetail/PanelElemen';
import Button from '../Fragments/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../redux/Action/LoginAction'

const Sidepanel = ({ open }) => {
    const { jobMhs } = useSelector(state => state.jobMhs)
    const { user } = useSelector(state => state.loginMhs)
    const [isOpen, setIsOpen] = useState(false)
    const [rotate, setIsRotate] = useState(false)

    const toogleAccordion = () => {
        setIsOpen(!isOpen)
        setIsRotate(!rotate)
    }

    return (
        <div className='bg-white drop-shadow-lg lg:drop-shadow-xl mt-3 px-2 py-2 lg:px-8 lg:py-8 rounded-lg'>
            <div className='flex justify-between cursor-pointer lg:hidden group' onClick={toogleAccordion}>
                <h1 className='text-md font-bold'>{jobMhs.jobTitle} - {jobMhs.jobType}</h1>
                <IoIosArrowUp className={`self-center transition ease-in-out duration-300 ${rotate ? 'rotate-180' : ''}`} />
            </div>
            <h1 className='text-lg font-bold hidden lg:block'>{jobMhs.jobTitle} - {jobMhs.jobType}</h1>
            <PanelElemen show={"hidden lg:block"} />
            {user && user.linkCV && user.linkRekom !== null ? (
                <button className='h-12 rounded-lg font-semibold w-full hidden lg:block bg-secondary text-white' onClick={open}>Apply Now</button>
            ) : (
                <div className='relative group'>
                    <button disabled className='h-12 rounded-lg font-semibold w-full hidden lg:block bg-slate-300 cursor-not-allowed'>Apply Now</button>
                    <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Kamu belum melampirkan CV dan Surat Rekomendasi</p>
                </div>
            )}
            {isOpen && (
                <div>
                    <PanelElemen />
                    {user && user.linkCV && user.linkRekom !== null ? (
                        <button className='w-full h-12 rounded-lg bg-black text-white font-semibold' onClick={open}>Apply Now</button>
                    ) : (
                        <div className='relative group'>
                            <button disabled className='w-full h-12 rounded-lg bg-slate-300 font-semibold cursor-not-allowed'>Apply Now</button>
                            <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Kamu belum melampirkan CV dan Surat Rekomendasi</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Sidepanel
