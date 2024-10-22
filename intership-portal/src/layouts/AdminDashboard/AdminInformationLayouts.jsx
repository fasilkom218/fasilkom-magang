import React, { useEffect, useState } from 'react'
import Drawer from '../../components/Drawer/Drawer'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import AdminInformation from '../../pages/AdminDashboard/AdminInformation'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../redux/Action/LoginAction'
import Loading from '../../components/Loading'

const AdminInformationLayouts = () => {
    const dispatch = useDispatch()
    const { isError, user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading])

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate('/forbidden')
        }
    }, [user])

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
                        <div className='sm:ml-20 sm:p-10'>
                            <AdminInformation />
                        </div>
                    </main>
                </>
            )}
        </div>
    )
}

export default AdminInformationLayouts
