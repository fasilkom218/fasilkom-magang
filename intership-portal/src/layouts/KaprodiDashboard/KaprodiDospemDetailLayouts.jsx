import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import KaprodiDospemDetail from '../../pages/KaprodiDashboard/KaprodiDospemDetail'
import { getDospemById } from '../../redux/Action/DospemAction'

const KaprodiDospemDetailLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    const data = {
        id,
        token: user.token
    }

    useEffect(() => {
        if (user && user.role !== "kaprodi") {
            navigate('/forbidden')
        }
        dispatch(getDospemById(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading, user, navigate, dispatch])

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <DrawerMobile />
                    <main className='w-full min-h-screen'>
                        <div className='hidden sm:block'>
                            <Drawer />
                        </div>
                        <section className='sm:ml-20 sm:p-10'>
                            <KaprodiDospemDetail />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default KaprodiDospemDetailLayouts
