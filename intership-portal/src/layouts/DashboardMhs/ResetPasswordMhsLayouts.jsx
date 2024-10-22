import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import ResetPassword from '../../pages/AdminDashboard/ResetPassword'
import ResetPasswordMhs from '../../pages/DashboardMhs/ResetPasswordMhs'

const ResetPasswordMhsLayouts = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
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
                    <ResetPasswordMhs />
                </>
            )}
        </div>
    )
}

export default ResetPasswordMhsLayouts
