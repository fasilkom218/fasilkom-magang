import React, { useEffect, useState } from 'react'
import { HiOutlineSpeakerphone } from "react-icons/hi";
import InformationCard from '../../components/Information/InformationCard';
import Modal from '../../components/Modal';
import ModalContent from '../../components/Information/ModalContent';
import { DialogTitle } from '@headlessui/react';
import InputForm from '../../element/InputForm/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo, getInfo } from '../../redux/Action/InformationAction';
import DataNotFound from '../../components/DataNotFound';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from 'react-icons/io5';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminInformation = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [selectId, setSelectId] = useState(null)
    const { user } = useSelector(state => state.auth)
    const { isLoading, info } = useSelector(state => state.info)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [search, setSearch] = useState('')

    const filterInfo = Array.isArray(info) ? info.filter(item => search.toLowerCase() === '' || item.title.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterInfo.slice(firstPostIndex, lastPostIndex)

    const [input, setInput] = useState({
        title: '',
        author: '',
    })
    const [desc, setDesc] = useState('')

    useEffect(() => {
        dispatch(getInfo(user.token))
    }, [dispatch])


    const handleShow = () => setShow(!show)
    const handleCloseShow = () => setShow(!show)

    const handleOpen = (id) => {
        setOpen(!open)
        setSelectId(id)
    }

    const handleClose = () => {
        setOpen(!open)
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newInfo = {
            title: input.title,
            author: input.author,
            desc: desc,
            token: user.token
        }

        dispatch(addInfo(newInfo))
        toast.success("Information created successfully")
        handleCloseShow()
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }
    return (
        <div className='px-4 mt-5 sm:mt-0'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4 '>
                <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
                    <div className='mb-3'>
                        <h1 className='text-lg font-bold'>Information</h1>
                        <p className='text-sm text-slate-500'>You can create and manage information here.</p>
                    </div>
                    <button className='bg-secondary text-white font-semibold px-4 py-2 rounded-md w-48 md:self-center' onClick={handleShow}>Create Information</button>
                </div>
                {/* Information Card */}
                <div className='mt-10 md:mt-0'>
                    <div className='flex flex-col md:flex-row gap-2 justify-between my-4'>
                        <div className='flex gap-2 items-center'>
                            <HiOutlineSpeakerphone className='w-5 h-5 sm:w-7 sm:h-7' />
                            <h1 className='text-lg font-semibold sm:text-xl'>Informasi Terbaru</h1>
                        </div>
                        <div className='mb-3 md:mb-0 md:w-[40%] lg:w-[50%] xl:w-[30%]'>
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
                    </div>
                    <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4'>
                        {isLoading ? (
                            <div className='col-span-full mx-auto'>
                                <HashLoader color='#CE231C' size={50} />
                            </div>
                        ) : (
                            currentPost.length > 0 ? (
                                currentPost.map(item => (
                                    <div onClick={() => handleOpen(item.id)} key={item.id}>
                                        <InformationCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <DataNotFound>
                                    {search ? 'Your search result not found' : 'Belum ada informasi'}
                                </DataNotFound>
                            )
                        )}
                    </div>
                    {!isLoading && (
                        <Pagination
                            totalPost={filterInfo.length}
                            postPerPage={postPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage} />
                    )}
                </div>
            </div>

            {/* Modal Card Section */}
            <Modal open={open} handleClose={handleClose}>
                <ModalContent id={selectId} handleClose={handleClose} />
            </Modal>

            {/* Modal Button Section */}
            <Modal open={show} handleClose={handleCloseShow}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="w-full">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Create Information
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
                                            placeholder='You can write any information here...'
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
                            onClick={() => handleCloseShow()}
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

export default AdminInformation
