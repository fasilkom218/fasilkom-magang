import { DialogTitle } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import InputForm from '../../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { editAccount } from '../../redux/Action/CreateAccountAction'
import { toast } from 'react-toastify'
import { refreshTokenUser } from '../../redux/Action/LoginAction'
import InputPassword from '../../element/InputForm/InputPassword'


const ModalContent = ({ id, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { isLoading, account, isError, isSuccess, message } = useSelector(state => state.account)
    const item = account ? account.find(item => item.id === id) : null
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: '',
        role: ''
    })

    useEffect(() => {
        // dispatch(refreshTokenUser())
        if (item) {
            setInput({
                name: item.name || '',
                email: item.email || '',
                password: item.password || '',
                confPassword: item.password || '',
                role: item.role || ''
            })
        }
    }, [item])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newAccount = {
            id: id,
            name: input.name,
            email: input.email,
            password: input.password,
            confPassword: input.confPassword,
            role: input.role,
            token: user.token
        }

        dispatch(editAccount(newAccount))
    }

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else if (isError) {
            toast.error(message)
        }
    }, [message, isError, isSuccess])

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="w-full">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Update Account and Give Permission Role.
                        </DialogTitle>
                        <div className="mt-1">
                            <p className="text-xs text-gray-500">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, quae.
                            </p>
                        </div>
                        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                            <InputForm
                                label="Name"
                                name="name"
                                id="name"
                                type="text"
                                style="star-point"
                                size="mb-3"
                                value={input.name}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Email"
                                name="email"
                                id="email"
                                type="email"
                                style="star-point"
                                size="mb-3"
                                value={input.email}
                                onChange={handleInput}
                            />
                            <div className='sm:col-span-2'>
                                <label htmlFor="role" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Role</label>
                                <select
                                    required
                                    name="role"
                                    id="role"
                                    value={input.role}
                                    onChange={handleInput}
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                >
                                    <option value="">Chosee Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="mitra">Mitra</option>
                                    <option value="kaprodi">Kaprodi</option>
                                    <option value="dospem">Dosen Pembimbing</option>
                                    <option value="tim-magang">Tim Magang</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    className="inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                >
                    {isLoading ? <HashLoader size={20} color="white" /> : "Submit"}
                </button>
                <button
                    type="button"
                    data-autofocus
                    onClick={() => handleClose()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default ModalContent
