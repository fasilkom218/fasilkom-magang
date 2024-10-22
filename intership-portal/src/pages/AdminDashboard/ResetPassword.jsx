import React, { useState } from 'react'
import InputPassword from '../../element/InputForm/InputPassword'
import { HashLoader } from 'react-spinners'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        password: '',
        confPassword: ''
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_AUTH}/reset-password/${token}`, input)
            toast.success(response.data.message)
            navigate('/login-admin')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='container'>
            <div className='w-full min-h-96 flex justify-center items-center'>
                <div className='w-1/2 rounded-xl h-60 flex justify-center bg-slate-200 shadow-lg py-6'>
                    <div className='w-2/3 flex flex-col gap-4'>
                        <h1 className='text-xl font-bold'>Forgot Password</h1>
                        <form onSubmit={handleSubmit}>
                            <InputPassword
                                label={"Password"}
                                name={"password"}
                                id={"password"}
                                margin={"mt-6 mb-6"}
                                value={input.password}
                                onChange={handleInput}
                            />
                            <InputPassword
                                label={"Confirm Password"}
                                name={"confPassword"}
                                id={"confPassword"}
                                margin={"mt-6 mb-6"}
                                value={input.confPassword}
                                onChange={handleInput}
                            />
                            <button className='w-full py-2 px-4 rounded-lg bg-black text-white'>
                                {isLoading ? <HashLoader size={20} color="white" /> : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
