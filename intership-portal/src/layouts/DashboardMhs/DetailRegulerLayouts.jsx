import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRegulerMhsID } from '../../redux/Action/PengajuanAction'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import DetailReguler from '../../pages/DashboardMhs/DetailReguler'

const DetailRegulerLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const [isLoading, setIsLoading] = useState(true)

    const data = {
        id,
        token: user.token
    }

    useEffect(() => {
        dispatch(getRegulerMhsID(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading, dispatch])
    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Navbar show="navbar" />
                    <div className='md:flex'>
                        <Sidebar />
                        <DetailReguler />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailRegulerLayouts
