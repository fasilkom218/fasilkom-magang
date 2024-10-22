import { DialogTitle } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foramterDate } from '../../utils/formaterDate'
import { RiPencilFill } from 'react-icons/ri'
import Modal from '../Modal'
import InputForm from '../../element/InputForm/InputForm'
import { deleteInfo, editInfo } from '../../redux/Action/InformationAction'
import { toast } from 'react-toastify'
import { FaTrashAlt } from 'react-icons/fa'
import { HashLoader } from 'react-spinners'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ModalContent = ({ id, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { isLoading, info } = useSelector(state => state.info)
    const item = info.find(item => item.id === id)
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState({
        title: '',
        author: '',
    })
    const [desc, setDesc] = useState('')

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newInfo = {
            id: item.id,
            title: input.title,
            author: input.author,
            desc: desc,
            token: user.token
        }

        dispatch(editInfo(newInfo))
        handleClose()
        toast.success("Information updated successfully")
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    const handleOpen = () => setOpen(!open)

    const handleDelete = () => {

        const confirm = window.confirm("Are you sure want to delete this data?")
        const data = {
            id: id,
            token: user.token
        }

        if (confirm) {
            try {
                dispatch(deleteInfo(data))
                toast.success("Information deleted successfully")
                handleClose()
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } catch (error) {
                toast.error("Something went wrong")
            }
        }
    }

    useEffect(() => {
        if (item) {
            setInput({
                title: item.title || '',
                author: item.author || ''
            })
            setDesc(item.desc || '')
        }
    }, [item])
    return (
        <div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            {item.title}
                        </DialogTitle>
                        <div className='mt-2 flex gap-2'>
                            <div className='flex gap-1 self-center'>
                                <h1 className='text-sm font-semibold'>{item.author}</h1>
                                <p className='text-xs self-center font-semibold'>{" - "}{foramterDate(item.createdAt)}</p>
                            </div>
                            <div className='w-6 h-6 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' onClick={handleOpen}>
                                <RiPencilFill className='text-sm mx-auto' />
                            </div>
                            <div className='border-r-2 border-slate-400'></div>
                            <div className='w-6 h-6 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(item.id)}>
                                <FaTrashAlt className='text-sm mx-auto' />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm' dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    data-autofocus
                    onClick={() => handleClose()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>

            <Modal open={open} handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Update Information
                                </DialogTitle>
                                <div className="mt-1">
                                    <p className="text-xs text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, quae.
                                    </p>
                                </div>
                                <div className='mt-4 grid grid-cols-1 gap-2'>
                                    <InputForm
                                        label="Title"
                                        name="title"
                                        id="title"
                                        type="text"
                                        style="star-point"
                                        placeholder="Code of Conduct"
                                        size="mb-3"
                                        value={input.title}
                                        onChange={handleInput}
                                    />
                                    <InputForm
                                        label="Author"
                                        name="author"
                                        id="author"
                                        type="text"
                                        style="star-point"
                                        placeholder="Gong Yoo"
                                        size="mb-3"
                                        value={input.author}
                                        onChange={handleInput}
                                    />
                                    <div className=''>
                                        <label htmlFor="desc" className='text-xs font-semibold text-gray-900 star-point'>Deskripsi Informasi</label>
                                        <ReactQuill
                                            theme='snow'
                                            value={desc}
                                            onChange={setDesc}
                                        />
                                        <p className='text-xs text-gray-500'>Write a few sentences about information</p>
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
            </Modal>
        </div>
    )
}

export default ModalContent
