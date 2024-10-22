import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Dospem from '../../pages/DashboardMhs/Dospem'
import { useDispatch } from 'react-redux'
import { refreshToken } from '../../redux/Action/LoginMhsAction'
import Loading from '../../components/Loading'
import DospemDetail from '../../pages/DashboardMhs/DospemDetail'

const DetailDospemLayouts = () => {
    const dispatch = useDispatch()
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
                        <DospemDetail />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailDospemLayouts
