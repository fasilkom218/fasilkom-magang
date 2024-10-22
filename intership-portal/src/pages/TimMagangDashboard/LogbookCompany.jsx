import React, { useEffect, useState } from 'react'
import LogbookCard from '../DashboardMhs/LogbookCard'
import Modal from '../../components/Modal'
import ModalContent from '../../components/MitraLoker/ModalContent'
import { useDispatch, useSelector } from 'react-redux'
import { getLogbook } from '../../redux/Action/LogbookAction'
import { HashLoader } from 'react-spinners'
import DataNotFound from '../../components/DataNotFound';
import Pagination from '../../components/Pagination'
import { IoSearchOutline } from 'react-icons/io5'

const LogbookCompany = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { isLoading, logbook } = useSelector(state => state.logbook)
    const [open, setOpen] = useState(false)
    const [selectId, setSelectId] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(6)
    const [search, setSearch] = useState("")

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = Array.isArray(logbook) ? logbook.slice(firstPostIndex, lastPostIndex) : [];

    const handleOpen = (id) => {
        setOpen(!open)
        setSelectId(id)
    }

    const handleClose = () => setOpen(!open)

    useEffect(() => {
        dispatch(getLogbook(user.token))
    }, [dispatch])
    return (
        <div className='px-4'>
            <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                <div className=''>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-lg font-bold'>Logbook Intern</h1>
                        <p className='text-sm text-slate-500'>You can see all logbook of your intern here.</p>
                    </div>
                    <label htmlFor="" className='relative block mt-3 mb-3'>
                        <span className='sr-only'>Search</span>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                            <IoSearchOutline className='w-5 h-5' />
                        </span>
                        <input type="text" name="search" onChange={e => setSearch(e.target.value)} placeholder="Search for anything..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
                    </label>
                </div>
                {/* Logbook Card Section */}
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
                    {isLoading ? (
                        <div className='flex items-center justify-center col-span-full'>
                            <HashLoader size={50} color='#ce231c' />
                        </div>
                    ) : (
                        currentPost.length > 0 ? (
                            currentPost.filter(item => (
                                search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search.toLowerCase())
                            )).length > 0 ? (
                                currentPost.filter(item => (
                                    search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search.toLowerCase())
                                )).map(item => (
                                    <div key={item.id} onClick={() => handleOpen(item.id)}>
                                        <LogbookCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <DataNotFound>
                                    Your search not found
                                </DataNotFound>
                            )
                        ) : (
                            <DataNotFound>
                                No Logbook Created
                            </DataNotFound>
                        )
                    )}
                </div>

                {!isLoading && (
                    <Pagination
                        totalPost={logbook && logbook.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )}
            </div>

            {/* Modal Section */}
            <Modal open={open} handleClose={handleClose}>
                <ModalContent id={selectId} handleClose={handleClose} />
            </Modal>
        </div>
    )
}

export default LogbookCompany
