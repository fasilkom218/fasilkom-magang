import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Profile from '../../pages/DashboardMhs/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from '../../redux/Action/LoginMhsAction'
import Loading from '../../components/Loading'

const ProfileLayouts = () => {
  // const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // dispatch(refreshToken())
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
            <Profile />
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileLayouts
