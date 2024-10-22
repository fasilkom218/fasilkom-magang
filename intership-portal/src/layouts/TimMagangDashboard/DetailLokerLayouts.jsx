import React, { useEffect, useState } from 'react'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import DetailLoker from '../../pages/TimMagangDashboard/DetailLoker'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getJobId } from '../../redux/Action/CreateJobAction'
import Loading from '../../components/Loading'

const DetailLokerLayouts = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user && user.role !== "tim-magang") {
            navigate('/forbidden')
        }
    }, [user])

    useEffect(() => {
        const data = {
            id: id,
            token: user.token
        }
        dispatch(getJobId(data))
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
                            <DetailLoker />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default DetailLokerLayouts
