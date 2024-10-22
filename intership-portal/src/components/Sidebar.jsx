import React, { useState } from 'react'
import people from '../assets/img/people-6.jpg';
import { FaElementor, FaHouseUser, FaUser } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { IoIosArrowUp, IoIosBookmarks } from "react-icons/io";
import SideElemen from '../element/Sidebar/SideElemen';
import { useSelector } from 'react-redux';
import blank from '../assets/img/blank.png';
const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const [rotate, setRotate] = useState(false)
    const { user } = useSelector(state => state.loginMhs)

    const toogleSidebar = () => {
        setOpen(!open)
        setRotate(!rotate)
    }
    return (
        <div className='md:w-[40%] md:border-none lg:w-[32%] xl:w-[25%]'>
            <div className='border-t border-b border-black md:w-[40%] bg-[#F5F5F5] md:pt-10 md:border-none lg:w-[32%] xl:w-[25%]  md:fixed h-full overflow-y-auto'>
                <div className='hidden md:block w-44 h-44 px-4 mx-auto rounded-full bg-cover bg-top' style={{ backgroundImage: `url(${user.profile_pict === null ? blank : user.profile_pict})` }}></div>
                <h1 className='hidden md:block text-xl mt-5 font-semibold text-center'>{user.name}</h1>
                <div className='hidden md:block'>
                    <SideElemen />
                </div>
                <div className='p-4 flex justify-between md:hidden' onClick={toogleSidebar}>
                    <div className='flex gap-2'>
                        <FaUser className='text-xl self-center' />
                        <h1 className='text-md font-semibold'>{user.name}</h1>
                    </div>
                    <IoIosArrowUp className={`self-center ${rotate ? 'rotate-180' : ''} transition ease-in-out duration-300`} />
                </div>
                {open && <SideElemen />}
            </div>
        </div>
    )
}

export default Sidebar
