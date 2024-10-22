import React, { useState } from 'react'
import InputForm from '../../element/InputForm/InputForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_AUTH}/forgot-password`, {
                email
            })
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
                            <InputForm
                                label="Masukan Email"
                                name="email"
                                id="email"
                                type="email"
                                style="star-point"
                                placeholder="Masukan email yang terdaftar"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

export default ForgetPassword
