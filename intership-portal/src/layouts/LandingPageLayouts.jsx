import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LandingPage from '../pages/LandingPage'
import Footer from '../components/Footer'
import { HashLoader } from 'react-spinners'
import Loading from '../components/Loading'

const LandingPageLayouts = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                setLoading(false)
            }, 2000);
        })
    }, [loading])
    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Navbar show={"navbar"} />
                    <LandingPage />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default LandingPageLayouts
