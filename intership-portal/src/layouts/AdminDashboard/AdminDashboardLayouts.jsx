import React, { useEffect, useState } from 'react'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import Loading from '../../components/Loading'
import AdminDashboard from '../../pages/AdminDashboard/AdminDashboard'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminDashboardLayouts = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate('/forbidden')
        }
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading, user, navigate])

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <DrawerMobile />
                    <main className='w-full min-h-screen flex flex-row relative'>
                        <div className='hidden sm:block'>
                            <Drawer />
                        </div>
                        <section className='sm:ml-20 p-10 w-full'>
                            <AdminDashboard />
                        </section>
                    </main>
                </>
            )}
        </div>
    )
}

export default AdminDashboardLayouts
