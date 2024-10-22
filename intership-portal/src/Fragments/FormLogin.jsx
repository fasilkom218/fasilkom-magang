import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginMhs } from '../redux/Action/LoginMhsAction'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { reset } from '../redux/Slice/loginMhsSlice'
import InputPassword from '../element/InputForm/InputPassword'

const FormLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isSuccess, isError, message, user } = useSelector((state) => state.loginMhs)
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email: input.email,
            password: input.password
        }

        dispatch(loginMhs(data))
    }

    const emailRef = useRef(null)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            toast.success(user.msg)
            navigate('/internship')
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isSuccess, isError, message, dispatch, navigate])
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
            <Link to={"/forgot-password"}>
                <div className='flex justify-end -mt-5 mb-6 text-sm text-blue-500 hover:font-semibold cursor-pointer'>Forgot Password?</div>
            </Link>
            {isLoading ? (
                <div className='relative group'>
                    <button disabled className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold group-hover:cursor-not-allowed'>
                        {isLoading ? <HashLoader size={25} color='#fff' /> : "Login"}
                    </button>
                    <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                        Login Process
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

export default FormLogin
