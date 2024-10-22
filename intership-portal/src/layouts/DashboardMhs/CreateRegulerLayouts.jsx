import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import CreateReguler from '../../pages/DashboardMhs/CreateReguler'

const CreateRegulerLayouts = () => {
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
                    <div className='md:flex'>
                        <Sidebar />
                        <CreateReguler />
                    </div>
                </>
            )}
        </div>
    )
}

export default CreateRegulerLayouts
