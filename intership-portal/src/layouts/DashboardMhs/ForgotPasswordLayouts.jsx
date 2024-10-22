import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ForgotPassword from '../../pages/DashboardMhs/ForgotPassword'

const ForgotPasswordLayouts = () => {
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
                    <ForgotPassword />
                </>
            )}
        </div>
    )
}

export default ForgotPasswordLayouts
