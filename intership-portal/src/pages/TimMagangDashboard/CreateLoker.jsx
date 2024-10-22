import React, { useEffect, useState } from 'react'
import { SiPolywork } from "react-icons/si";
import Cards from '../../components/Cards';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJob } from '../../redux/Action/CreateJobAction';
import { HashLoader } from 'react-spinners'
import DataNotFound from '../../components/DataNotFound';
import Pagination from '../../components/Pagination';
import { IoSearchOutline } from 'react-icons/io5';

const CreateLoker = () => {
    const dispatch = useDispatch()
    const { isLoading, isError, isSuccess, job, message } = useSelector(state => state.job)
    const { user } = useSelector(state => state.auth)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [search, setSearch] = useState('')

    const filterJob = Array.isArray(job) ? job.filter(job => search.toLowerCase() === "" || job.jobTitle.toLowerCase().includes(search.toLowerCase())) : []
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterJob.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        dispatch(getJob(user.token))
    }, [dispatch])

    return (
        <div className='px-4'>
            <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
                    <div className=''>
                        <h1 className='text-lg font-bold'>Buat Lowongan Magang</h1>
                        <p className='text-sm text-slate-500'>Anda dapat membuat dan mengelola lowongan magang di sini.</p>
                    </div>
                    <a href={"/company-dashboard/create-internship"}>
                        <button className='bg-secondary text-white font-semibold px-4 py-2 rounded-md w-48 mt-3'>Create Internship</button>
                    </a>
                </div>

                {/* Job Section */}
                <div className='mt-10'>
                    <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                        <div className='flex gap-2 items-center'>
                            <SiPolywork className='w-5 h-5 sm:w-7 sm:h-7' />
                            <h1 className='text-lg font-semibold sm:text-xl'>Lowongan Magang</h1>
                        </div>
                        <div className='md:w-[40%] lg:w-[50%] xl:w-[25%]'>
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
                    <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
                        {isLoading ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            currentPost && currentPost.length > 0 ? (
                                currentPost.map(item => (
                                    <Cards key={item.id} {...item} />
                                ))
                            ) : (
                                <DataNotFound>
                                    {search ? 'Your search result not found' : 'Belum ada lowongan yang dibuat'}
                                </DataNotFound>
                            )
                        )}
                    </div>
                    {!isLoading && (
                        <Pagination
                            totalPost={filterJob.length}
                            postPerPage={postPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateLoker
