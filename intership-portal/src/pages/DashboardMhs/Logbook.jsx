import React, { useEffect, useState } from 'react'
import { DialogTitle } from '@headlessui/react'
import InputForm from '../../element/InputForm/InputForm'
import Modal from '../../components/Modal'
import LogbookCard from './LogbookCard'
import { useDispatch, useSelector } from 'react-redux'
import { addLogbookMhs } from '../../redux/Action/logbookMhsAction'
import DataNotFound from '../../components/DataNotFound'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import LogbookContent from '../../components/Logbook/LogbookContent'
import { getApply } from '../../redux/Action/ApplyJobAction'
import Pagination from '../../components/Pagination'
import { IoSearchOutline } from 'react-icons/io5'
import { getMhs } from '../../redux/Action/LoginMhsAction'
import { getDospemMhs } from '../../redux/Action/DospemAction'

const Logbook = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [selectId, setSelectId] = useState(null)
    const { user } = useSelector(state => state.loginMhs)
    const { isLoading, logbookMhs } = useSelector(state => state.logbookMhs)
    const { dospemMhs } = useSelector(state => state.dospem)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [search, setSearch] = useState('')

    const filterLogbook = Array.isArray(logbookMhs) ? logbookMhs.filter(logbook => search.toLowerCase() === "" || logbook.title.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firsPostIndex = lastPostIndex - postPerPage
    const currentPost = filterLogbook.slice(firsPostIndex, lastPostIndex)

    const [input, setInput] = useState({
        title: '',
        desc: '',
        dateOfPosting: ''
    })

    useEffect(() => {
        dispatch(getMhs(user.token))
        dispatch(getDospemMhs(user.token))
    }, [dispatch])

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleShow = (id) => {
        setShow(!show)
        setSelectId(id)
    }

    const handleNotShow = () => setShow(!show)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            title: input.title,
            desc: input.desc,
            dateOfPosting: input.dateOfPosting,
            token: user.token
        }

        try {
            dispatch(addLogbookMhs(data))
            toast.success("Logbook has been updated")
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            if (error.response) {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className=''>
                <h1 className='text-lg font-bold'>Logbook</h1>
                <p className='text-sm text-slate-500'>Tell about your internship activities in this logbook</p>
                <div className='flex flex-col sm:flex-row gap-2 sm:justify-between my-3'>
                    <div className='mb-3 md:mb-0 md:w-[40%] lg:w-[50%] xl:w-[50%]'>
                        <label htmlFor="" className='relative block'>
                            <span className='sr-only'>Search</span>
                            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                                <IoSearchOutline className='w-5 h-5' />
                            </span>
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for anything..."
                                onChange={e => setSearch(e.target.value)}
                                className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' />
                        </label>
                    </div>
                    {dospemMhs && dospemMhs.length > 0 ? (
                        <button className='bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-lg' onClick={handleOpen}>Buat Logbook</button>
                    ) : (
                        <div className='relative group'>
                            <button disabled className='text-white text-sm font-semibold px-4 py-2 rounded-lg bg-slate-300 cursor-not-allowed'>Buat Laporan</button>
                            <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Kamu belum memiliki Dosen pembimbing</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Logbook Card */}
            <div className='grid gird-cols-1 gap-2 sm:grid-cols-2 '>
                {isLoading ? (
                    <div className='col-span-full mx-auto row-start-10'>
                        <HashLoader color='#CE231C' size={50} />
                    </div>
                ) : (
                    currentPost && currentPost.length > 0 ? (
                        currentPost.map(item => (
                            <div key={item.id} onClick={() => handleShow(item.id)}>
                                <LogbookCard item={item} />
                            </div>
                        ))
                    ) : (
                        <DataNotFound>
                            {search ? 'Your search result not found' : 'Belum ada logbook'}
                        </DataNotFound>
                    )
                )}
            </div>

            {!isLoading && (
                <Pagination
                    totalPost={filterLogbook.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            )}

            {/* Modal Section (Add Logbook) */}
            <Modal open={open} handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Create Your Logbook
                                </DialogTitle>
                                <div className="mt-1">
                                    <p className="text-xs text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, quae.
                                    </p>
                                </div>
                                <div className='mt-4'>
                                    <InputForm
                                        label="Title"
                                        name="title"
                                        id="title"
                                        type="text"
                                        style="star-point"
                                        placeholder="Day 1 as a backend developer intern"
                                        value={input.title}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <InputForm
                                        label="Date"
                                        name="dateOfPosting"
                                        id="dateOfPosting"
                                        type="date"
                                        style="star-point"
                                        value={input.dateOfPosting}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="desc" className='text-xs font-semibold text-gray-900 star-point'>Deskripsi Kegiatan</label>
                                    <textarea
                                        required
                                        name="desc"
                                        id="desc"
                                        rows={3}
                                        cols={50}
                                        value={input.desc}
                                        onChange={handleInput}
                                        placeholder='saya adalah seorang yang pemberani...'
                                        className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent' />
                                    <p className='text-xs text-gray-500'>Write a few sentences about your activity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {isLoading ? (
                            <div className='relative group'>
                                <button disabled className='inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto group-hover:cursor-not-allowed'>
                                    {isLoading ? <HashLoader size={25} color='#fff' /> : "Submit"}
                                </button>
                                <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                                    Loading Process
                                </span>
                            </div>
                        ) : (
                            <button className='inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto'>
                                Submit
                            </button>
                        )}
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

            {/* Modal Section (Show Logbook) */}
            <Modal open={show} handleClose={handleNotShow}>
                <LogbookContent id={selectId} handleClose={handleNotShow} />
            </Modal>
        </div>
    )
}

export default Logbook
