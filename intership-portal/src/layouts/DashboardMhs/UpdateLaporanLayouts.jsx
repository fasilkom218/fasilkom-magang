import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import LaporanMagang from '../../pages/DashboardMhs/LaporanMagang'
import { useDispatch } from 'react-redux'
import { refreshToken } from '../../redux/Action/LoginMhsAction'
import Loading from '../../components/Loading'
import UpdateLaporan from '../../pages/DashboardMhs/UpdateLaporan'

const UpdateLaporanLayouts = () => {
    // const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // dispatch(refreshToken())
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Navbar show="navbar" />
                    <div className='md:flex'>
                        <Sidebar />
                        <UpdateLaporan />
                    </div>
                </>
            )}
        </div>
    )
}

export default UpdateLaporanLayouts
