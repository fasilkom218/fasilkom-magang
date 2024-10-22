import React, { useEffect, useState } from 'react'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import ApplicantDetail from '../../pages/TimMagangDashboard/ApplicantDetail'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import { getApplicantId } from '../../redux/Action/ApplicantAction'
const ApplicantDetailLayouts = () => {
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
        dispatch(getApplicantId(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [dispatch, isLoading])
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
                            <ApplicantDetail />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default ApplicantDetailLayouts
