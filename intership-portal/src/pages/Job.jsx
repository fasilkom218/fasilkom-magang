import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import { IoSearchOutline } from 'react-icons/io5'
import Cards from '../components/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'
import DataNotFound from '../components/DataNotFound'
import { getJob } from '../redux/Action/ApplyJobAction'
import Pagination from '../components/Pagination'

const Job = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const { isLoading, jobMhs } = useSelector(state => state.jobMhs)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [search, setSearch] = useState("")

    const filterJob = Array.isArray(jobMhs) ? jobMhs.filter(job => search.toLowerCase() === "" || job.jobTitle.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterJob.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        dispatch(getJob(user.token))
    }, [dispatch])

    return (
        <div>
            <section className='container'>
                {/* Banner Section */}
                <Banner />

                {/* Search Section */}
                <div className='md:flex justify-between'>
                    <div className='mb-3 md:mb-0 md:w-[40%] lg:w-[50%] xl:w-[60%]'>
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
                                className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-slate-800 focus:ring-slate-800 focus:ring-1 sm:text-sm' />
                        </label>
                    </div>
                    <div className='flex gap-4'>
                        <button className='bg-slate-800 font-bold text-white text-sm px-2 py-2 rounded-md' onClick={getJob}>Best Match</button>
                        <button className='bg-slate-800 font-bold text-white text-sm px-2 py-2 rounded-md'>Latest Job</button>
                        <button className='bg-slate-800 font-bold text-white text-sm px-2 py-2 rounded-md'>Popular Job</button>
                    </div>
                </div>

                {/* Job Section */}
                <div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:mt-7'>
                    {
                        isLoading ? (
                            <div className="col-span-full mx-auto">
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            currentPost && currentPost.length > 0 ? (
                                currentPost.map(item => (
                                    <Cards key={item.id} {...item} />
                                ))
                            ) : (
                                <DataNotFound>
                                    {search ? "Your search result not found" : "No Job Available"}
                                </DataNotFound>
                            )
                        )
                    }

                </div>
                {!isLoading && (
                    <Pagination
                        totalPost={filterJob.length}
                        postPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                )}
            </section>
        </div>
    )
}

export default Job
