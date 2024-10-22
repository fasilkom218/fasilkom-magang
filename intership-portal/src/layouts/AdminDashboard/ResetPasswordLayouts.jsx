import React from 'react'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import ResetPassword from '../../pages/AdminDashboard/ResetPassword'

const ResetPasswordLayouts = () => {
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
                    <ResetPassword />
                </>
            )}
        </div>
    )
}

export default ResetPasswordLayouts
