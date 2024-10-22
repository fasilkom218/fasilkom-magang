import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import Sidepanel from '../components/Sidepanel'
import Modal from '../components/Modal'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { DialogTitle } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { applyJob, getJobById } from '../redux/Action/ApplyJobAction'
import { toast } from 'react-toastify'

const DetailJob = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.loginMhs)
    const { isLoading, jobMhs, sukses, isError, message } = useSelector(state => state.jobMhs)
    const [tab, setTab] = useState("desc")
    const [open, setOpen] = useState(false)
    const [sop, setSop] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            id: id,
            sop: sop,
            token: user.token
        }

        dispatch(applyJob(data))
    }

    useEffect(() => {
        if (sukses) {
            handleClose()
            toast.success(message)
            setTimeout(() => {
                navigate('/information')
            }, 2000);
        } else if (isError) {
            toast.error(message)
        }
    }, [sukses, isError])
    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    return (
        <div>
            {isLoading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <HashLoader size={50} color='#ce231c' />
                </div>
            ) : (
                <section className='container min-h-screen'>
                    {/* Back Section */}
                    <Link to={'/internship'}>
                        <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[20%] xl:w-[18%]'>
                            <IoIosArrowRoundBack className='text-3xl group-hover:rotate-90 transition ease-in-out duration-200' />
                            <h1 className='text-sm font-bold self-center'>Back to previous page</h1>
                        </div>
                    </Link>
                    {jobMhs && (
                        <>
                            {/* Header Section */}
                            <div className='px-2 py-2 sm:flex sm:gap-2 sm:justify-between'>
                                <div className='flex gap-2 lg:gap-6'>
                                    <div className='w-20 bg-white drop-shadow-md rounded-lg flex lg:w-[150px] lg:h-[150px] px-2 overflow-hidden'>
                                        <img src={jobMhs.User.profile === null ? "https://via.placeholder.com/150" : jobMhs.User.profile} alt="" className='self-center' />
                                    </div>
                                    <div className='flex flex-col self-center'>
                                        <h1 className='text-lg font-semibold lg:text-xl'>{jobMhs.jobTitle}</h1>
                                        <h2 className='text-md font-medium lg:text-lg'>{jobMhs.User.name}</h2>
                                        <h2 className='text-sm lg:text-md'>{jobMhs.User.email}</h2>
                                    </div>
                                </div>
                            </div>

                            <div className='lg:grid lg:gap-4 w-full lg:grid-cols-3'>
                                {/* Apply Section */}
                                <div className='md:col-start-2 lg:col-start-3'>
                                    <Sidepanel open={handleOpen} />
                                </div>

                                {/* Description Section */}
                                <div className='mt-5  px-2 py-2 md:col-start-1 md:row-start-1 lg:col-span-2 md:mt-3'>
                                    <div className='border-b border-solid border-[#0066ff34]'>
                                        <button
                                            onClick={() => setTab("desc")}
                                            className={`${tab === "desc" && "border-b border-solid border-secondary text-secondary"} 
                                                                mr-5 text-[16px] leading-7 text-slate-600 font-semibold`}
                                        >
                                            Description
                                        </button>
                                        <button
                                            onClick={() => setTab("info")}
                                            className={`${tab === "info" && "border-b border-solid border-secondary text-secondary"} 
                                                                text-[16px] leading-7 text-slate-600 font-semibold`}
                                        >
                                            Company Info
                                        </button>
                                    </div>
                                    <div className='mt-3 text-sm'>
                                        {tab === "desc" ?
                                            <div dangerouslySetInnerHTML={{ __html: jobMhs.desc }} className='text-justify' />
                                            : jobMhs.User.desc === null ? "No Description" : jobMhs.User.desc}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Modal Section */}
                    <Modal open={open} handleClose={handleClose}>
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="">
                                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            Apply for internship now
                                        </DialogTitle>
                                        <div className="mt-1">
                                            <p className="text-xs text-gray-500">
                                                You can tell us about yourself and your experience.
                                            </p>
                                        </div>
                                        <div className='mt-4'>
                                            <label htmlFor="sop" className='text-xs font-semibold text-gray-900 star-point'>Description about yourself</label>
                                            <textarea
                                                required
                                                name="sop"
                                                id="sop"
                                                rows={3}
                                                cols={50}
                                                value={sop}
                                                onChange={(e) => setSop(e.target.value)}
                                                placeholder='It is a long established fact that a reader will...'
                                                className='mt-2 text-sm ring-2 ring-secondary focus:outline-none rounded-lg w-full py-2.5 px-4 text-black-800 placeholder:opacity-50' />
                                            <p className='text-xs text-gray-500'>Write a few sentences about yourself</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:gap-2">
                                {isLoading ? (
                                    <div className='relative group'>
                                        <button disabled className='mt-3 inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto'>
                                            {isLoading ? <HashLoader size={25} color='#fff' /> : "Submit"}
                                        </button>
                                        <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                                            Loading Process
                                        </span>
                                    </div>
                                ) : (
                                    <button className='mt-3 inline-flex w-full justify-center rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto'>Submit</button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >Cancel</button>
                            </div>
                        </form>
                    </Modal>
                </section>
            )}
        </div>
    )
}

export default DetailJob
