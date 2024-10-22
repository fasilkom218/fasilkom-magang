import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import blank from '../../assets/img/blank.png'
import { toast } from 'react-toastify'
import axios from 'axios'
import TableNilai from '../../components/TableNilai'
import TableNilaiMhs from '../../components/TableNilaiMhs'

const Detaildata = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSelector(state => state.loginMhs)
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('')


    useEffect(() => {
        if (data.total > 90 && data.total <= 100) {
            setStatus("Nilai A")
            setColor("bg-green-500")
        } else if (data.total > 85 && data.total <= 90) {
            setStatus("Nilai A-")
            setColor("bg-green-500")
        } else if (data.total > 80 && data.total <= 85) {
            setStatus("Nilai B+")
            setColor("bg-blue-500")
        } else if (data.total > 75 && data.total <= 80) {
            setStatus("Nilai B")
            setColor("bg-blue-500")
        } else if (data.total > 70 && data.total <= 75) {
            setStatus("Nilai B-")
            setColor("bg-blue-500")
        } else if (data.total > 65 && data.total <= 70) {
            setStatus("Nilai C+")
            setColor("bg-yellow-500")
        } else if (data.total > 60 && data.total <= 65) {
            setStatus("Nilai C")
            setColor("bg-yellow-500")
        } else if (data.total > 55 && data.total <= 60) {
            setStatus("Nilai C-")
            setColor("bg-yellow-500")
        } else if (data.total > 50 && data.total <= 55) {
            setStatus("Nilai D")
            setColor("bg-orange-500")
        } else {
            setStatus("Nilai E")
            setColor("bg-red-500")
        }
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_MHS}/bobot/${id}`, {
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
                            <Link to={'/dashboard/nilai'}>
                                <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[22%]'>
                                    <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                    <h1 className='text-sm self-center'>Back to previous page</h1>
                                </div>
                            </Link>
                            <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-lg font-bold'>Detail Nilai Mahasiswa</h1>
                                    <p className='text-sm text-slate-500'>Kamu dapat melihat detail nilai magang disini.</p>
                                </div>
                                <div className='flex-col gap-4'>
                                    <div className={`sm:self-center px-4 font-bold py-2 ${color || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                        {status}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* data Reguler Detail */}
                        <div className='flex flex-col gap-4 mt-10'>
                            <div className='flex gap-2 flex-col sm:flex-row lg:gap-4'>
                                <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                    style={{
                                        backgroundImage: `url(${data.Mahasiswa.profile_pict === null ?
                                            blank : data.Mahasiswa.profile_pict})`
                                    }}
                                />
                                <div className='flex flex-col gap-2 items-center sm:items-start self-center'>
                                    <h1 className='text-lg font-semibold lg:text-xl'>{data.Mahasiswa.name}</h1>
                                    <p className='text-sm text-slate-500'>{data.Mahasiswa.email}</p>
                                </div>
                            </div>
                            <div className="mt-6 ">
                                <dl className="divide-y divide-gray-900">
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Nama
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.Mahasiswa.name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            NPM
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.Mahasiswa.npm}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Dosen Pembimbing
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.User.name}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Jurusan
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.Mahasiswa.prodi}
                                        </dd>
                                    </div>
                                    <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm leading-6 text-gray-900 font-bold">
                                            Semester
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {data.Mahasiswa.semester}
                                        </dd>
                                    </div>

                                    <div className='mt-5'>
                                        <TableNilaiMhs item={data} />
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

export default Detaildata
