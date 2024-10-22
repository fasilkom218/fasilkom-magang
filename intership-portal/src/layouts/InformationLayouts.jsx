import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Information from '../pages/Information'
import Footer from '../components/Footer'
import Loading from '../components/Loading'

const InformationLayouts = () => {
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
        <>
          <Navbar show={'navbar'} />
          <Information />
          <Footer />
        </>
      )}
    </div>
  )
}

export default InformationLayouts
