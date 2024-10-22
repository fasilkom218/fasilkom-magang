import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ChangePass from '../../pages/DashboardMhs/ChangePass'
import { useDispatch } from 'react-redux'
import { refreshToken } from '../../redux/Action/LoginMhsAction'

const ChangePassLayouts = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(refreshToken())
  // }, [dispatch])
  return (
    <div>
      <Navbar show="navbar" />
      <div className='md:flex'>
        <Sidebar />
        <ChangePass />
      </div>
    </div>
  )
}

export default ChangePassLayouts
