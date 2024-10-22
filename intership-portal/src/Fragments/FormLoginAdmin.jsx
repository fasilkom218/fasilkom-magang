import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import { HashLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { reset } from '../redux/Slice/authSlice'
import { Login } from '../redux/Action/LoginAction'
import InputPassword from '../element/InputForm/InputPassword';

const FormLoginAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const emailRef = useRef(null)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const users = {
            email: input.email,
            password: input.password
        }

        dispatch(Login(users))
    }

    useEffect(() => {
        if (isSuccess && user && !isError) {
            if (user.role === 'admin') {
                navigate("/admin-dashboard")
                toast.success("Login Success")
            } else if (user.role === 'tim-magang') {
                navigate("/company-dashboard")
                toast.success("Login Success")
            } else if (user.role === 'kaprodi') {
                navigate("/kaprodi-dashboard")
                toast.success("Login Success")
            } else if (user.role === 'dospem') {
                navigate("/dospem-dashboard")
                toast.success("Login Success")
            } else if (user.role === 'mitra') {
                navigate("/mitra-dashboard")
                toast.success("Login Success")
            } else {
                navigate("/error-page")
                toast.error("Something went wrong")
            }
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }

    }, [isSuccess, user, isError, navigate, dispatch])
    return (
        <form onSubmit={handleSubmit}>
            <InputForm
                label="Email"
                type="email"
                name="email"
                id="email"
                style="star-point"
                placeholder="jhondoe@example.com"
                ref={emailRef}
                value={input.email}
                onChange={handleInput}
            />
            <InputPassword
                label={"Password"}
                name={"password"}
                id={"password"}
                margin={"mt-6 mb-6"}
                value={input.password}
                onChange={handleInput}
            />
            <Link to={"/forget-password"}>
                <div className='flex justify-end -mt-5 mb-6 text-sm text-blue-500 hover:font-semibold cursor-pointer'>Forgot Password?</div>
            </Link>
            {isLoading ? (
                <div className='relative group'>
                    <button disabled className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold group-hover:cursor-not-allowed'>
                        {isLoading ? <HashLoader size={25} color='#fff' /> : "Login"}
                    </button>
                    <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                        Loading Process
                    </span>
                </div>
            ) : (
                <button className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold'>
                    Login
                </button>
            )}
        </form>
    )
}

export default FormLoginAdmin
