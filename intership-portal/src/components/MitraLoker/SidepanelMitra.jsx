import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PanelElemenMitra from './PanelElemenMitra';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidepanelMitra = ({ open }) => {
    const { id } = useParams()
    const { isLoading, job } = useSelector(state => state.job)
    const [isOpen, setIsOpen] = useState(false)
    const [rotate, setIsRotate] = useState(false)

    const toogleAccordion = () => {
        setIsOpen(!isOpen)
        setIsRotate(!rotate)
    }

    return (
        <div className='bg-white drop-shadow-lg lg:drop-shadow-xl mt-3 px-2 py-2 lg:px-8 lg:py-8 rounded-lg'>
            <div className='flex justify-between cursor-pointer lg:hidden group' onClick={toogleAccordion}>
                <h1 className='text-sm sm:text-md font-bold'>{job.jobTitle} - {job.jobType}</h1>
                <IoIosArrowUp className={`self-center transition ease-in-out duration-300 ${rotate ? 'rotate-180' : ''}`} />
            </div>
            <h1 className='text-lg font-bold hidden lg:block'>{job.jobTitle} - {job.jobType}</h1>
            <PanelElemenMitra show={"hidden lg:block"} />
            {isOpen && (
                <div>
                    <PanelElemenMitra />
                </div>
            )}
        </div>
    )
}

export default SidepanelMitra
