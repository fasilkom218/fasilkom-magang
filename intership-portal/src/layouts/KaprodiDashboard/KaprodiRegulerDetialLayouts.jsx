import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import KaprodiRegulerDetail from '../../pages/KaprodiDashboard/KaprodiRegulerDetail'
import { getMagangRegulerById } from '../../redux/Action/MagangRegulerAction'

const KaprodiRegulerDetialLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user && user.role !== "kaprodi") {
            navigate('/forbidden')
        }
    }, [user, navigate])

    useEffect(() => {
        const data = {
            id,
            token: user.token
        }

        dispatch(getMagangRegulerById(data))
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
                    <DrawerMobile />
                    <main className='w-full min-h-screen'>
                        <div className='hidden sm:block'>
                            <Drawer />
                        </div>
                        <section className='sm:ml-20 sm:p-10'>
                            <KaprodiRegulerDetail />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default KaprodiRegulerDetialLayouts
