import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Loading from '../../components/Loading'
import DetailLaporan from '../../pages/DashboardMhs/DetailLaporan'

const DetailLaporanLayouts = () => {
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
                        <DetailLaporan />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailLaporanLayouts
