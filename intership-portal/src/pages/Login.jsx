import React from 'react'
import AuthLayouts from '../layouts/AuthLayouts'
import FormLogin from '../Fragments/FormLogin'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Login = () => {
    return (
        <>
            <Navbar show={'navbar'} />
            <AuthLayouts title="Login To Fasilkom" type="Login">
                <FormLogin />
            </AuthLayouts>
        </>
    )
}

export default Login
