import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { color } from '../../assets/data/color'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import blank from '../../assets/img/blank.png'

const DetailLaporan = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSelector(state => state.loginMhs)

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure want to delete this data?")
        if (confirm) {
            try {
                axios.delete(`${import.meta.env.VITE_API_URL_MHS}/laporan/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                toast.success("Data berhasil dihapus")
                navigate('/dashboard/laporan-magang')
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    toast.error(message)
                }
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_MHS}/laporan/${id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })

                setData(response.data.data)
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    toast.error(message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='px-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-6 py-8'>
                {isLoading ? (
                    <div className='flex justify-center items-center min-h-screen'>
                        <HashLoader color='#CE231C' size={50} />
                    </div>
                ) : (
                    <div className='w-full'>
                        <div className=''>
                            {/* Back Section */}
                            <Link to={'/dashboard/laporan-magang'}>
                                <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[22%]'>
                                    <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                    <h1 className='text-sm self-center'>Back to previous page</h1>
                                </div>
                            </Link>
                            <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-lg font-bold'>Detail Laporan Magang Mahasiswa</h1>
                                    <p className='text-sm text-slate-500'>You can see about internship report detail here.</p>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className={`sm:self-center px-4 py-2 ${color[data.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                        {data.status}
                                    </div>
                                    <div className='flex gap-2 justify-center sm:self-center mt-2'>
                                        <a href={`/dashboard/update-laporan/${data.id}`}>
                                            <div className='w-8 h-8 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' >
                                                <RiPencilFill className='text-sm mx-auto' />
                                            </div>
                                        </a>
                                        <div className='border-r-2 border-slate-400 h-8'></div>
                                        <div className='w-8 h-8 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(data.id)}>
                                            <FaTrashAlt className='text-sm mx-auto' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Magang Reguler Detail */}
                        <div className='flex flex-col gap-4 mt-10'>
                            <div className='flex gap-2 flex-col sm:flex-row lg:gap-4'>
                                <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                    style={{
                                        backgroundImage: `url(${data.Mahasiswa.profile_pict === null ?
                                            blank : data.Mahasiswa.profile_pict})`
                                    }}
                                />
                                <div className='flex flex-col items-center sm:items-start gap-2 self-center'>
                                    <h1 className='text-lg font-semibold lg:text-xl'>{data.nama} ({data.Mahasiswa.prodi})</h1>
                                    <p className='text-sm text-slate-500'>{data.Mahasiswa.email}</p>
                                </div>
                            </div>
                            <div className="mt-6 ">
                                <dl className="divide-y divide-gray-900">
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Full Name
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.nama}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            NPM
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.npm}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Dosen Pembimbing
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.User.name}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Komentar Dosen Pembimbing
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                            {data.comment === null ? 'Tidak ada komentar dari dosen pembimbing' : data.comment}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Tempat Magang
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.tempat_magang}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Alamat Magang
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.alamat_magang}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Longitude Magang
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.longitude_magang}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Latitude Magang
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {data.latitude_magang}
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Dokumentasi Magang
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <a href={`${data.dokumentasi}`} target="_blank" rel="noopener noreferrer">
                                                <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                    {data.dokumentasi}
                                                </span>
                                            </a>
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-bold leading-6 text-gray-900">
                                            Lembar Pengesahan
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
                                                                Lembar_Pengesahan_{data.Mahasiswa.name}.pdf
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <a
                                                            href={`${data.lembar_pengesahan}`}
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
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-bold leading-6 text-gray-900">
                                            Laporan Magang
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
                                                                Laporan_Magang_{data.Mahasiswa.name}.pdf
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <a
                                                            href={`${data.laporan_magang}`}
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetailLaporan
