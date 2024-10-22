import React, { useEffect } from 'react'
import DrawerMobile from '../../components/Drawer/DrawerMobile'
import Drawer from '../../components/Drawer/Drawer'
import ChangePassword from '../../pages/AdminDashboard/ChangePassword'

const ChangePasswordLayouts = () => {
    return (
        <>
            <DrawerMobile />
            <main className='w-full min-h-screen'>
                <div className='hidden sm:block'>
                    <Drawer />
                </div>
                <section className='sm:ml-20 sm:p-10'>
                    <ChangePassword />
                </section>
            </main>
        </>
    )
}

export default ChangePasswordLayouts
