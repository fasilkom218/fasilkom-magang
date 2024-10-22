import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InputForm from '../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'

const FormProfileKaprodi = () => {
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: '',
        email: '',
        desc: '',
        alamat: '',
        no_telpon: '',
        role: '',
    })

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL_KAPRODI}/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
                )
                setInput({
                    name: response.data.data.name || '',
                    email: response.data.data.email || '',
                    desc: response.data.data.desc || '',
                    alamat: response.data.data.alamat || '',
                    no_telpon: response.data.data.no_telpon || '',
                    role: response.data.data.role || '',
                })
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    return toast.error(message)
                }
            }
        }
        getUserById()
    }, [])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.put(`${import.meta.env.VITE_API_URL_KAPRODI}/edit/${id}`, input, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success('Success Update Profile')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message
                return toast.error(message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-3'>
                    <InputForm
                        label="Full Name"
                        name="name"
                        id="name"
                        type="text"
                        size="mb-3"
                        style="star-point"
                        value={input.name}
                        onChange={handleInput}
                        placeholder={input.name === "" ? "Jhon Doe" : input.name}
                    />
                    <InputForm
                        label="Email"
                        name="email"
                        id="email"
                        type="email"
                        size="mb-3"
                        style="star-point"
                        value={input.email}
                        onChange={handleInput}
                        placeholder={input.email === "" ? "Email dosn't exist" : input.email}
                    />
                    <div className='mb-3 sm:col-span-2'>
                        <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Deskripsi</label>
                        <textarea
                            required
                            name="desc"
                            id="desc"
                            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                            rows={3}
                            cols={10}
                            value={input.desc}
                            onChange={handleInput}
                            placeholder={input.desc === "" ? "I'm a Administrator" : input.desc}
                        />
                    </div>
                    <div className='mb-3 sm:col-span-2'>
                        <label htmlFor="alamat" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Address</label>
                        <textarea
                            required
                            name="alamat"
                            id="alamat"
                            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                            rows={3}
                            cols={10}
                            value={input.alamat}
                            onChange={handleInput}
                            placeholder={input.alamat === "" ? "Jl. Kenaga No. 1" : input.alamat}
                        />
                    </div>
                    <InputForm
                        label="Phone Number"
                        name="no_telpon"
                        id="no_telpon"
                        type="number"
                        size="mb-3"
                        style="star-point"
                        value={input.no_telpon}
                        onChange={handleInput}
                        placeholder={input.no_telpon === "" ? "no phone number dosn't exist" : input.no_telpon}
                    />
                    <div>
                        <label htmlFor="role" className='block text-sm font-bold text-slate-600 mb-2'>Role</label>
                        <input
                            type="text"
                            name='role'
                            id='role'
                            value={input.role}
                            onChange={handleInput}
                            placeholder={input.role === "" ? "Role dosn't exist" : input.role}
                            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent cursor-not-allowed'
                            disabled={true}
                        />
                    </div>
                </div>
                <p className='text-sm text-slate-500 mb-3'>Do you want to change your password?{" "}
                    <Link to={`/admin-dashboard/change-password/${id}`}>
                        <span className='text-blue-400 hover:underline font-semibold'>
                            Yes
                        </span>
                    </Link>
                </p>
                <button className='w-full bg-secondary rounded-lg py-2 mb-3 text-white font-semibold'>
                    {loading ? <HashLoader size={25} color='#fff' /> : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default FormProfileKaprodi
