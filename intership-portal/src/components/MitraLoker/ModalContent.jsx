import { DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foramterDate } from '../../utils/formaterDate'
import { RiPencilFill } from 'react-icons/ri'
import Modal from '../Modal'
import InputForm from '../../element/InputForm/InputForm'
import { deleteInfo, editInfo } from '../../redux/Action/InformationAction'
import { toast } from 'react-toastify'
import { FaCheckSquare, FaTrashAlt } from 'react-icons/fa'
import { HashLoader } from 'react-spinners'
import { color } from '../../assets/data/color'
import axios from 'axios'

const ModalContent = ({ id, handleClose }) => {
    const { logbook } = useSelector(state => state.logbook)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const item = logbook.find(item => item.id === id)
    const [tab, setTab] = useState("desc")
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState("")

    const handleOpen = () => setOpen(!open)
    const Close = () => setOpen(false)

    const handleRevision = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_DOSPEM}/logbook/${id}`, {
                status: 'revision',
                comment: comment
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        } finally {
            handleClose()
            setIsLoading(false)
        }
    }

    const handleAccept = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_DOSPEM}/logbook/${id}`, {
                status: 'accepted',
                comment: null
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        } finally {
            handleClose()
            setIsLoading(false)
        }
    }
    return (
        <div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="w-full">
                        <div className='flex justify-between'>
                            <DialogTitle as="h3" className="self-center text-base font-semibold leading-6 text-gray-900">
                                {item.title}
                            </DialogTitle>
                            <div className={`px-4 py-1 font-semibold text-white rounded-lg ${color[item.status]}`}>{item.status}</div>
                        </div>
                        <div className='mt-2 flex justify-between gap-2'>
                            <div className='flex gap-1 self-center'>
                                <h1 className='text-sm font-semibold'>{item.Mahasiswa.name}</h1>
                                <p className='text-xs self-center font-semibold'>{" - "}{foramterDate(item.dateOfPosting)}</p>
                            </div>
                            <div className='flex gap-2 sm:self-center mt-2'>
                                <div className='w-8 h-8 rounded-md border bg-blue-500 text-white flex items-center cursor-pointer' onClick={handleOpen}>
                                    <RiPencilFill className='text-sm mx-auto' />
                                </div>
                                <div className='border-r-2 border-slate-400 h-8'></div>
                                <div className='w-8 h-8 rounded-md bg-green-500 text-white flex items-center cursor-pointer' onClick={handleAccept}>
                                    <FaCheckSquare className='text-md mx-auto' />
                                </div>
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

            <Modal open={open} handleClose={Close}>
                <form onSubmit={handleRevision}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Komentar Logbook
                                </DialogTitle>
                                <div className="mt-1">
                                    <p className="text-xs text-gray-500">
                                        Anda dapat memberikan komentar terhadap logbook mahasiswa.
                                    </p>
                                </div>
                                <div className='mt-4'>
                                    <div className=''>
                                        <label htmlFor="comment" className='text-md font-semibold text-gray-900 star-point'>Komentar</label>
                                        <textarea
                                            required
                                            name="comment"
                                            id="comment"
                                            rows={7}
                                            cols={50}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            placeholder='Tuliskan komentar anda disini...'
                                            className='text-sm border-2 border-primary rounded-lg w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' />
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
                            onClick={() => Close()}
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
