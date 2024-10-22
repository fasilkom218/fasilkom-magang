import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Logbook from '../../pages/DashboardMhs/Logbook'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from '../../redux/Action/LoginMhsAction'
import { getLogbookMhs } from '../../redux/Action/logbookMhsAction'
import Loading from '../../components/Loading'

const LogbookLayouts = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.loginMhs)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getLogbookMhs(user.token))
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
          <Navbar show="navbar" />
          <div className='md:flex'>
            <Sidebar />
            <Logbook token={user.token} />
          </div>
        </>
      )}
    </div>
  )
}

export default LogbookLayouts
