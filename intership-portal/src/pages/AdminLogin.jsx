import React from 'react'
import logo from '../assets/img/logo.png'
import logoUniv from '../assets/img/logo-univ.png'
import { Link } from 'react-router-dom'
import google from '../assets/img/google.png'
import FormLoginAdmin from '../Fragments/FormLoginAdmin'
import Navbar from '../components/Navbar'
import fasilkom from '../assets/img/fasilkom.png'


const AdminLogin = () => {
    return (
        <>
            <Navbar show={'navbar'} />
            <div className='flex justify-center items-center min-h-screen'>
                <div className='w-full max-w-xs sm:max-w-[420px]'>
                    <img src={fasilkom} alt="" className='w-36 mx-auto mb-5' />
                    <div className='text-3xl font-extrabold mb-2 text-center'>Login To Fasilkom</div>
                    <p className='font-medium text-slate-600 mb-4 text-center'>
                        Welcome, Please enter your detail
                    </p>
                    <div aria-disabled className='mx-auto px-4 py-2 border border-slate-400 flex items-center justify-center gap-2 rounded-lg mb-4 relative cursor-not-allowed group'>
                        <img src={google} alt="" className='w-7' />
                        <p className='text-md font-semibold'>Login With Google</p>
                        <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Sorry this feature is not available yet</p>
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t-2 border-gray-400"></div>
                        <span className="mx-4 text-gray-500">or</span>
                        <div className="flex-grow border-t-2 border-gray-400"></div>
                    </div>
                    <FormLoginAdmin />
                </div>
            </div>
        </>
    )
}

export default AdminLogin
