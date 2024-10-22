import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { color } from '../../assets/data/color'
import blank from '../../assets/img/blank.png'
import TableNilai from '../../components/TableNilai'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import { deleteNilai } from '../../redux/Action/NilaiAction'
import { toast } from 'react-toastify'

const DospemNilaiDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, nilai } = useSelector(state => state.nilai)
    const { user } = useSelector(state => state.auth)
    const [status, setStatus] = useState('')
    const [color, setColor] = useState('')

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure want to delete this data?")
        const data = {
            id,
            token: user.token
        }
        if (confirm) {
            dispatch(deleteNilai(data))
            toast.success("Nilai berhasil dihapus")
            navigate('/dospem-dashboard/nilai')
        }
    }

    useEffect(() => {
        if (nilai.total > 90 && nilai.total <= 100) {
            setStatus("Nilai A")
            setColor("bg-green-500")
        } else if (nilai.total > 85 && nilai.total <= 90) {
            setStatus("Nilai A-")
            setColor("bg-green-500")
        } else if (nilai.total > 80 && nilai.total <= 85) {
            setStatus("Nilai B+")
            setColor("bg-blue-500")
        } else if (nilai.total > 75 && nilai.total <= 80) {
            setStatus("Nilai B")
            setColor("bg-blue-500")
        } else if (nilai.total > 70 && nilai.total <= 75) {
            setStatus("Nilai B-")
            setColor("bg-blue-500")
        } else if (nilai.total > 65 && nilai.total <= 70) {
            setStatus("Nilai C+")
            setColor("bg-yellow-500")
        } else if (nilai.total > 60 && nilai.total <= 65) {
            setStatus("Nilai C")
            setColor("bg-yellow-500")
        } else if (nilai.total > 55 && nilai.total <= 60) {
            setStatus("Nilai C-")
            setColor("bg-yellow-500")
        } else if (nilai.total > 50 && nilai.total <= 55) {
            setStatus("Nilai D")
            setColor("bg-orange-500")
        } else {
            setStatus("Nilai E")
            setColor("bg-red-500")
        }
    }, [nilai])

    return (
        <div className='px-4'>
            {isLoading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <HashLoader color='#CE231C' size={50} />
                </div>
            ) : (
                <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                    <div className=''>
                        {/* Back Section */}
                        <Link to={'/dospem-dashboard/nilai'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[80%] sm:w-[65%] lg:w-[25%] xl:w-[18%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Detail Nilai Mahasiswa</h1>
                                <p className='text-sm text-slate-500'>You can see about detail your student guidance here.</p>
                            </div>
                            <div className='flex-col gap-4'>
                                <div className={`sm:self-center px-4 font-bold py-2 ${color || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                    {status}
                                </div>
                                <div className='flex justify-center sm:justify-normal gap-2 sm:self-center mt-2'>
                                    <a href={`/dospem-dashboard/update-nilai/${nilai.Nilai.id}`}>
                                        <div className='w-8 h-8 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' >
                                            <RiPencilFill className='text-sm mx-auto' />
                                        </div>
                                    </a>
                                    <div className='border-r-2 border-slate-400 h-8'></div>
                                    <div className='w-8 h-8 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(nilai.Nilai.id)}>
                                        <FaTrashAlt className='text-sm mx-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Nilai Reguler Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex flex-col sm:flex-row gap-2 lg:gap-4'>
                            <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${nilai.Mahasiswa.profile_pict === null ?
                                        blank : nilai.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col items-center sm:items-start gap-2 self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{nilai.Mahasiswa.name}</h1>
                                <p className='text-sm text-slate-500'>{nilai.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nama
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {nilai.Mahasiswa.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {nilai.Mahasiswa.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Dosen Pembimbing
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {nilai.User.name}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Jurusan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {nilai.Mahasiswa.prodi}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Semester
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {nilai.Mahasiswa.semester}
                                    </dd>
                                </div>

                                <div className='mt-5'>
                                    <TableNilai />
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DospemNilaiDetail
