import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SidepanelMitra from '../../components/MitraLoker/SidepanelMitra'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob } from '../../redux/Action/CreateJobAction'
import { toast } from 'react-toastify'
import intern from '../../assets/img/intern.jpg'

const DetailLoker = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { isLoading, job } = useSelector(state => state.job)
    const [tab, setTab] = useState("desc")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure want to delete this data?")
        const data = {
            id: id,
            token: user.token
        }

        if (confirm) {
            try {
                dispatch(deleteJob(data))
                toast.success("Success delete job")
                navigate('/company-dashboard/internship')
            } catch (error) {
                toast.error("Something went wrong")
            }
        }
    }

    return (
        <div className='px-4'>
            <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                <div>
                    <a href={'/company-dashboard/internship'}>
                        <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[20%] xl:w-[18%]'>
                            <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in-out duration-200' />
                            <h1 className='text-sm self-center'>Back to previous page</h1>
                        </div>
                    </a>
                </div>
                <div className='flex flex-col gap-2 sm:flex-row sm:justify-between'>
                    <div className=''>
                        <h1 className='text-lg font-bold'>Internship Detail</h1>
                        <p className='text-sm text-slate-500'>You can see internship detail here.</p>
                    </div>
                    <div className='flex gap-2 sm:self-center'>
                        <Link to={`/company-dashboard/internship/edit/${job.id}`}>
                            <div className='w-8 h-8 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' >
                                <RiPencilFill className='text-sm mx-auto' />
                            </div>
                        </Link>
                        <div className='border-r-2 border-slate-400 h-8'></div>
                        <div className='w-8 h-8 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(job.id)}>
                            <FaTrashAlt className='text-sm mx-auto' />
                        </div>
                    </div>
                </div>

                {/* Job Detail Section */}
                <section>
                    {/* Header Section */}
                    <div className='px-2 py-2 sm:flex sm:gap-2 sm:justify-between'>
                        <div className='flex gap-2 lg:gap-6'>
                            <div className='w-20 bg-white drop-shadow-md rounded-lg flex lg:w-[150px] lg:h-[150px] px-2 overflow-hidden'>
                                <img src={job.User.profile === null ? intern : job.User.profile} alt="" className='self-center' />
                            </div>
                            <div className='flex flex-col self-center'>
                                <h1 className='text-md font-semibold lg:text-xl'>{job.jobTitle}</h1>
                                <h2 className='text-sm font-medium lg:text-lg'>{job.User.name}</h2>
                                <h2 className='text-sm lg:text-md'>{job.User.email}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className='lg:grid lg:gap-4 w-full lg:grid-cols-3'>
                        {/* Apply Section */}
                        <div className='md:col-start-2 lg:col-start-3'>
                            <SidepanelMitra open={handleOpen} />
                        </div>

                        {/* Description Section */}
                        <div className='mt-5  px-2 py-2 md:col-start-1 md:row-start-1 lg:col-span-2 md:mt-3'>
                            <div className='border-b border-solid border-[#0066ff34]'>
                                <button
                                    onClick={() => setTab("desc")}
                                    className={`${tab === "desc" && "border-b border-solid border-primary text-primary"} 
                        mr-5 text-[16px] leading-7 text-slate-600 font-semibold`}
                                >
                                    Description
                                </button>
                                <button
                                    onClick={() => setTab("info")}
                                    className={`${tab === "info" && "border-b border-solid border-primary text-primary"} 
                        text-[16px] leading-7 text-slate-600 font-semibold`}
                                >
                                    Company Info
                                </button>
                            </div>
                            <div className='mt-3 text-sm'>
                                {tab === "desc" ? (
                                    <div dangerouslySetInnerHTML={{ __html: job.desc }} className='text-justify' />
                                ) : (
                                    job.User.desc === null ? "No Description" : job.User.desc
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DetailLoker
