import React, { useEffect, useState } from 'react'
import Drawer from '../../components/Drawer/Drawer'
import CreateAccount from '../../pages/AdminDashboard/CreateAccount'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading'

const CreateAccountLayouts = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    })
  }, [isLoading])

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate('/forbidden')
    }
  }, [user])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DrawerMobile />
          <main className='w-full min-h-screen'>
            <div className='hidden sm:block'>
              <Drawer />
            </div>
            <section className='sm:ml-20 sm:p-10'>
              <CreateAccount />
            </section>
          </main>
        </>
      )}
    </div>
  )
}

export default CreateAccountLayouts
