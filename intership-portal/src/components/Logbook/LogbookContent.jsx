import { DialogTitle } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foramterDate, formaterTime } from '../../utils/formaterDate'
import { deleteLogbookMhs, updateLogbookMhs } from '../../redux/Action/logbookMhsAction'
import { toast } from 'react-toastify'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from '../Modal'
import InputForm from '../../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'
import { refreshToken } from '../../redux/Action/LoginMhsAction'

const LogbookContent = ({ id, handleClose }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const { isLoading, logbookMhs } = useSelector(state => state.logbookMhs)
    const item = logbookMhs.find(item => item.id === id)
    const formatDate = item.dateOfPosting.slice(0, 10)
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState("desc")
    const [input, setInput] = useState({
        title: item.title,
        desc: item.desc,
        dateOfPosting: formatDate
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            id: item.id,
            title: input.title,
            desc: input.desc,
            dateOfPosting: input.dateOfPosting,
            token: user.token
        }

        dispatch(updateLogbookMhs(data))
        toast.success("Logbook has been updated")
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }

    const handleOpen = () => setOpen(!open)

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure want to delete this data?")

        const data = {
            id: id,
            token: user.token
        }

        if (confirm) {
            try {
                dispatch(deleteLogbookMhs(data))
                toast.success("Logbook has been deleted")
                handleClose()
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            } catch (error) {
                toast.error("Something went wrong")
            }
        }
    }

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

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
                                <h1 className='text-sm font-semibold'>{item.Mahasiswa.name}</h1>
                                <p className='text-xs self-center font-semibold'>{" - "}{foramterDate(item.dateOfPosting)}</p>
                            </div>
                            <div className='w-6 h-6 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' onClick={handleOpen}>
                                <RiPencilFill className='text-sm mx-auto' />
                            </div>
                            <div className='border-r-2 border-slate-400'></div>
                            <div className='w-6 h-6 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(item.id)}>
                                <FaTrashAlt className='text-sm mx-auto' />
                            </div>
                        </div>
                        <div className='mt-5 md:col-start-1 md:row-start-1 lg:col-span-2 md:mt-3'>
                            <div className='border-b border-solid border-[#0066ff34]'>
                                <button
                                    onClick={() => setTab("desc")}
                                    className={`${tab === "desc" && "border-b border-solid border-secondary text-secondary"} 
                                                                mr-5 text-[13px] leading-7 text-slate-600 font-semibold`}
                                >
                                    Logbook
                                </button>
                                <button
                                    onClick={() => setTab("info")}
                                    className={`${tab === "info" && "border-b border-solid border-secondary text-secondary"} 
                                                                text-[13px] leading-7 text-slate-600 font-semibold`}
                                >
                                    Komentar Dosen
                                </button>
                            </div>
                            <div className='mt-3 text-sm'>
                                {tab === "desc" ?
                                    <div className='text-justify'>{item.desc}</div>
                                    : item.comment === null ? "No Comment" : item.comment}
                            </div>
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

            {/* Modal Section */}
            <Modal open={open} handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Update Logbook
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
                                        label="Date"
                                        name="dateOfPosting"
                                        id="dateOfPosting"
                                        style="star-point"
                                        type="date"
                                        size="mb-3"
                                        value={input.dateOfPosting}
                                        onChange={handleInput}
                                    />
                                    <div className=''>
                                        <label htmlFor="desc" className='text-xs font-semibold text-gray-900 star-point'>Deskripsi Informasi</label>
                                        <textarea
                                            required
                                            name="desc"
                                            id="desc"
                                            rows={3}
                                            cols={50}
                                            value={input.desc}
                                            onChange={handleInput}
                                            placeholder='Student must follow the code of conduct...'
                                            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent' />
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

export default LogbookContent
