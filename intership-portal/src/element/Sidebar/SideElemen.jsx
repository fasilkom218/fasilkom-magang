import React from 'react'
import { FaElementor, FaHouseUser, FaUser } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import { IoIosBookmarks } from "react-icons/io";
import { NavLink, useLocation } from 'react-router-dom';

const SideElemen = () => {
    const location = useLocation()

    const links = [
        { href: "/dashboard", label: "Dashboard", icon: <FaHouseUser className='text-xl mt-1' /> },
        { href: "/dashboard/pengajuan-magang", label: "Pengajuan Magang", icon: <FaUser className='text-xl mt-1' /> },
        { href: "/dashboard/bimbingan", label: "Bimbingan Magang", icon: <TbNotes className='text-xl mt-1' /> },
        { href: "/dashboard/logbook", label: "Logbook Magang", icon: <IoIosBookmarks className='text-xl mt-1' /> },
        { href: "/dashboard/dosen-pembimbing", label: "Dosen Pembimbing", icon: <FaElementor className='text-xl mt-1' /> }
    ];

    return (
        <div className='flex flex-col gap-2 md:items-center md:mt-5'>
            {links.map((link, index) => {
                const isActive = location.pathname === link.href;

                return (
                    <a
                        key={index}
                        href={link.href}
                        className={`flex gap-2 w-full p-4 drop-shadow-md md:w-[80%] md:rounded-lg 
              ${isActive ? 'bg-white' : 'bg-transparent'} hover:bg-white cursor-pointer`}
                    >
                        {link.icon}
                        <h1 className='text-lg font-semibold'>{link.label}</h1>
                    </a>
                );
            })}
        </div>
    )
}

export default SideElemen
