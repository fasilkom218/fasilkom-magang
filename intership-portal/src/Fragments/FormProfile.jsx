import React, { useEffect, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'

const FormProfile = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        name: '',
        email: '',
        desc: null,
        alamat: '',
        no_hp: '',
        prodi: '',
        tgl_lahir: '',
        semester: '',
        npm: '',
        linkRekom: null,
        linkCV: null
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            prodi: e.target.value === "Informatika" ? "Informatika" : "Sistem Informasi"
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_MHS}/edit/profile/${user.id}`, input, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500);
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message
                toast.error(message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_MHS}/me`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                const formatDate = response.data.data.tgl_lahir.slice(0, 10)
                setInput({
                    name: response.data.data.name || '',
                    email: response.data.data.email || '',
                    desc: response.data.data.desc || null,
                    alamat: response.data.data.alamat || '',
                    no_hp: response.data.data.no_hp || '',
                    prodi: response.data.data.prodi || '',
                    npm: response.data.data.npm || '',
                    tgl_lahir: formatDate || '',
                    semester: response.data.data.semester || '',
                    linkRekom: response.data.data.linkRekom || null,
                    linkCV: response.data.data.linkCV || null
                })
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    toast.error(message)
                }
            }
        }
        getUserById()
    }, [])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Biografi</label>
                    <textarea
                        required
                        name="desc"
                        id="desc"
                        className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                        rows={3}
                        cols={10}
                        value={input.desc}
                        onChange={handleInput}
                        placeholder='Tell us about yourself...' />
                    <p className='text-xs text-slate-500'>write something about yourself</p>
                </div>
                <div className='grid grid-cols-1 gap-2 mt-3 sm:grid-cols-2'>
                    <InputForm
                        label="Full Name"
                        style="star-point"
                        size="mb-3"
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Gong Yoo"
                        value={input.name}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Email"
                        size="mb-3"
                        style="star-point"
                        name="email"
                        id="email"
                        type="email"
                        placeholder="gongyoo@gmail.com"
                        value={input.email}
                        onChange={handleInput}
                    />
                    <div className='sm:col-span-2'>
                        <label htmlFor="alamat" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Address</label>
                        <textarea
                            required
                            name="alamat"
                            id="alamat"
                            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                            rows={3}
                            cols={10}
                            placeholder='Jl. Raya Cempaka No.21'
                            value={input.alamat}
                            onChange={handleInput}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-2 mt-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
                    <InputForm
                        label="Phone Number"
                        size="mb-3 col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1"
                        style="star-point"
                        name="no_hp"
                        id="no_hp"
                        type="number"
                        placeholder="081234567890"
                        value={input.no_hp}
                        onChange={handleInput}
                    />
                    <div>
                        <label htmlFor="prodi" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Program Studi</label>
                        <select required name="prodi" id="prodi" value={input.prodi} onChange={handleSelect} className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                            <option value="">Choose Program Studi</option>
                            <option value="Informatika">Informatika</option>
                            <option value="Sistem informasi">Sistem Informasi</option>
                        </select>
                    </div>
                    <InputForm
                        size='mb-3'
                        label="Semester"
                        type="number"
                        style="star-point"
                        name="semester"
                        id="semester"
                        placeholder="1"
                        value={input.semester}
                        onChange={handleInput}
                    />
                </div>
                <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    <InputForm
                        label="NPM"
                        size="mb-3"
                        style="star-point"
                        name="npm"
                        id="npm"
                        type="text"
                        value={input.npm}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Birth Date"
                        size="mb-3"
                        style="star-point"
                        name="tgl_lahir"
                        id="tgl_lahir"
                        type="date"
                        value={input.tgl_lahir}
                        onChange={handleInput}
                    />
                    <div>
                        <InputForm
                            label="Surat Rekomendasi"
                            size="mb-3"
                            style="star-point"
                            name="linkRekom"
                            id="linkRekom"
                            type="text"
                            placeholder="https://drive.google.com/file/mycv.pdf"
                            value={input.linkRekom}
                            onChange={handleInput}
                        />
                        <p className='text-xs text-slate-500'>Drop your surat rekomendasi here</p>
                    </div>
                    <div>
                        <InputForm
                            label="CV"
                            size="mb-3"
                            style="star-point"
                            name="linkCV"
                            id="linkCV"
                            type="text"
                            placeholder="https://drive.google.com/file/mycv.pdf"
                            value={input.linkCV}
                            onChange={handleInput}
                        />
                        <p className='text-xs text-slate-500'>Drop your cv here</p>
                    </div>
                </div>
                <p className='text-sm mt-8 text-slate-500'>Do you want to update your password?{" "}
                    <Link to={"/dashboard/change-password"}>
                        <span className='text-primary font-semibold hover:underline'>Yes</span>
                    </Link>
                </p>
                <button className='bg-secondary text-white w-full py-2 rounded-lg font-semibold mt-5'>
                    {isLoading ? <HashLoader color="white" size={25} /> : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default FormProfile
