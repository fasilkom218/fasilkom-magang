import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../../pages/DashboardMhs/Dashboard'
import Loading from '../../components/Loading'

const DashboardLayouts = () => {
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
            <Dashboard />
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardLayouts
