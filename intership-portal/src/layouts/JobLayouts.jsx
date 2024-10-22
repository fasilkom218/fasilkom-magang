import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Job from '../pages/Job'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

const JobLayouts = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    })
  }, [loading])

  return (
    <div className=''>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar show={'navbar'} />
          <Job />
          <Footer />
        </>
      )}
    </div>
  )
}

export default JobLayouts
