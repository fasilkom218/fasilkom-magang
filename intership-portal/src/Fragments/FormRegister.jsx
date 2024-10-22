import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import { useDispatch, useSelector } from 'react-redux'
import { registerMhs } from '../redux/Action/LoginMhsAction'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { reset } from '../redux/Slice/loginMhsSlice'
import InputPassword from '../element/InputForm/InputPassword'

const FormRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.loginMhs)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        prodi: '',
        semester: '',
        npm: '',
        tgl_lahir: ''

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

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            name: input.name,
            email: input.email,
            password: input.password,
            confPassword: input.confPassword,
            prodi: input.prodi,
            semester: input.semester,
            npm: input.npm,
            tgl_lahir: input.tgl_lahir
        }

        dispatch(registerMhs(data))
    }

    const usernameRef = useRef(null)

    useEffect(() => {
        usernameRef.current.focus()
    }, [])
    useEffect(() => {
        if (isSuccess) {
            toast.success(message)
            navigate('/login')
        } else if (isError) {
            toast.error(message)
        }
        dispatch(reset())
    }, [isSuccess, isError, message, dispatch, navigate])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputForm
                    size='mb-3'
                    label="Full Name"
                    type="text"
                    style="star-point"
                    name="name"
                    id="name"
                    placeholder="Jhon Doe"
                    ref={usernameRef}
                    value={input.name}
                    onChange={handleInput}
                />
                <InputForm
                    size='mb-3'
                    label="Email"
                    type="email"
                    style="star-point"
                    name="email"
                    id="email"
                    placeholder="jhondoe@example.com"
                    value={input.email}
                    onChange={handleInput}
                />
                <InputPassword
                    label={"Password"}
                    name={"password"}
                    id={"password"}
                    margin={"mb-3"}
                    value={input.password}
                    onChange={handleInput}
                />
                <InputPassword
                    label={"Confirm Password"}
                    name={"confPassword"}
                    id={"confPassword"}
                    margin={"mb-3"}
                    value={input.confPassword}
                    onChange={handleInput}
                />
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <label htmlFor="prodi" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Program Studi</label>
                        <select required name="prodi" id="prodi" value={input.prodi} onChange={handleSelect} className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                            <option value="">Choose Program Studi</option>
                            <option value="Informatika">Informatika</option>
                            <option value="Sistem Informasi">Sistem Informasi</option>
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
                <InputForm
                    label="NPM"
                    type="text"
                    style="star-point"
                    name="npm"
                    id="npm"
                    value={input.npm}
                    onChange={handleInput}
                    placeholder="2010631170126"
                />
                <InputForm
                    label="Tanggal Lahir"
                    type="date"
                    style="star-point"
                    name="tgl_lahir"
                    id="tgl_lahir"
                    value={input.tgl_lahir}
                    onChange={handleInput}
                />
                {isLoading ? (
                    <div className='relative group'>
                        <button disabled className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold group-hover:cursor-not-allowed'>
                            {isLoading ? <HashLoader size={25} color='#fff' /> : "Register"}
                        </button>
                        <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                            Register Process
                        </span>
                    </div>
                ) : (
                    <button className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold'>
                        Register
                    </button>
                )}
            </form>
        </div>
    )
}

export default FormRegister
