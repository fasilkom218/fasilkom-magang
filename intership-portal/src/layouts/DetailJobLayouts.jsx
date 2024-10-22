import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DetailJob from '../pages/DetailJob'
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken } from '../redux/Action/LoginMhsAction'
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom'
import { getJobById } from '../redux/Action/ApplyJobAction'

const DetailJobLayouts = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.loginMhs)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = {
      id: id,
      token: user.token
    }

    dispatch(getJobById(data))
    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [isLoading, dispatch])
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Navbar show={'navbar'} />
          <DetailJob />
          <Footer />
        </>
      )}
    </div>
  )
}

export default DetailJobLayouts
