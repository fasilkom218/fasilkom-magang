import React from 'react'
import AuthLayouts from '../layouts/AuthLayouts'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import FormRegister from '../Fragments/FormRegister'
import Navbar from '../components/Navbar'

const Register = () => {
    return (
        <>
            <Navbar show={'navbar'} />
            <div className='py-10'>
                <AuthLayouts title="Registration Account" type="Register">
                    <FormRegister />
                </AuthLayouts>
            </div>
        </>
    )
}

export default Register
