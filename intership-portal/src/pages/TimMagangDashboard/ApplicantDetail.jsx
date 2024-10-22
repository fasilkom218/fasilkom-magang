import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import blank from '../../assets/img/blank.png'

const color = {
    "applied": "bg-blue-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
}

const ApplicantDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { isLoading, applicant } = useSelector(state => state.app)

    const handleAccept = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_TIM}/applications/status/${id}`, {
                status: "accepted",
                dateOfJoining: new Date().toISOString()
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/company-dashboard/applicant')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    const handleReject = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_TIM}/applications/status/${id}`, {
                status: "rejected",
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/company-dashboard/applicant')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    return (
        <div className='px-4'>
            <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                <div className=''>
                    {/* Back Section */}
                    <Link to={'/company-dashboard/applicant'}>
                        <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[18%]'>
                            <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                            <h1 className='text-sm self-center'>Back to previous page</h1>
                        </div>
                    </Link>
                    <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-lg font-bold'>Applicant Information</h1>
                            <p className='text-sm text-slate-500'>You can see about applicant detail here.</p>
                        </div>
                        <div className={`sm:self-center px-4 py-2 ${color[applicant.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                            {applicant.status}
                        </div>
                    </div>
                </div>

                {/* Applicant Detail */}
                <div className='flex flex-col gap-4 mt-10'>
                    <div className='flex flex-col sm:flex-row gap-2 lg:gap-4'>
                        <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                            style={{
                                backgroundImage: `url(${applicant.Mahasiswa.profile_pict === null ?
                                    blank : applicant.Mahasiswa.profile_pict})`
                            }}
                        />
                        <div className='flex flex-col gap-2 items-center sm:items-start self-center'>
                            <h1 className='text-lg font-semibold lg:text-xl'>{applicant.Mahasiswa.name}</h1>
                            <p className='text-sm text-slate-500'>{applicant.Mahasiswa.email}</p>
                        </div>
                    </div>
                    <div className="mt-6 ">
                        <dl className="divide-y divide-gray-900">
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {applicant.Mahasiswa.name}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Application for
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {applicant.job.jobTitle}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <a href={`mailto:${applicant.Mahasiswa.email}`}>
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {applicant.Mahasiswa.email}
                                        </span>
                                    </a>
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Nomer Telpon
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <a href={`https://wa.me/${applicant.Mahasiswa.no_hp}`} target="_blank" rel="noopener noreferrer">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {applicant.Mahasiswa.no_hp === null ? "No Data" : applicant.Mahasiswa.no_hp}
                                        </span>
                                    </a>
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    About
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {applicant.Mahasiswa.desc === null ? "No Desc" : applicant.Mahasiswa.desc}
                                </dd>
                            </div>
                            <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Attachments
                                </dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul
                                        role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                    >
                                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon
                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        CV_{applicant.Mahasiswa.name}.pdf
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a
                                                    href={`${applicant.Mahasiswa.linkCV}`}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                    target="_blank"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Button Action */}
                <div className='mt-5'>
                    <div className='flex flex-col-reverse gap-2 sm:justify-start sm:flex-row-reverse'>
                        <button className='px-4 py-2 bg-secondary text-white font-semibold rounded-lg'
                            onClick={handleReject}>
                            Rejected
                        </button>
                        <button className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white'
                            onClick={handleAccept}>
                            Accept
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicantDetail
