import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import DetailKompetensi from '../../pages/DashboardMhs/DetailKompetensi'
import { getKompetensiMhsID } from '../../redux/Action/PengajuanAction'
import { useParams } from 'react-router-dom'

const DetailKompetensiLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const [isLoading, setIsLoading] = useState(true)

    const data = {
        id,
        token: user.token
    }

    useEffect(() => {
        dispatch(getKompetensiMhsID(data))
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
                        <DetailKompetensi />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailKompetensiLayouts
