import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Contact from '../pages/Contact'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
const ContactLayout = () => {
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
                    <Contact />
                    <Footer />
                </>
            )}
        </div>
    )
}

export default ContactLayout
