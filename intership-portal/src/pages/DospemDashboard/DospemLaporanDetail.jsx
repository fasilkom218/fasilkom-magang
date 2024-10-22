import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { color } from '../../assets/data/color'
import blank from '../../assets/img/blank.png'
import { PaperClipIcon } from '@heroicons/react/24/outline'
import Modal from '../../components/Modal'
import { acceptLaporan, revisionLaporan } from '../../redux/Action/BimbinganAction'
import { toast } from 'react-toastify'
import { DialogTitle } from '@headlessui/react'

const DospemLaporanDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const { isLoading, laporan, isSuccess, isError, message } = useSelector(state => state.bimbingan)
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState(null)

    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    const handleAccept = () => {
        const data = {
            id,
            token: user.token
        }

        dispatch(acceptLaporan(data))
        if (isSuccess) {
            toast.success("Success accepted report")
            navigate('/dospem-dashboard/laporan')
        } else if (isError) {
            toast.error(message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            id,
            token: user.token,
            comment
        }

        dispatch(revisionLaporan(data))
        if (isSuccess) {
            toast.success("Success revision report")
            navigate('/dospem-dashboard/laporan')
        } else if (isError) {
            toast.error(message)
        }
    }


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
                        <Link to={'/dospem-dashboard/laporan'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[75%] sm:w-[60%] lg-w-[25%] xl:w-[18%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Detail Laporan Magang Mahasiswa</h1>
                                <p className='text-sm text-slate-500'>You can see about internship report detail here.</p>
                            </div>
                            <div className={`sm:self-center px-4 py-2 ${color[laporan.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                {laporan.status}
                            </div>
                        </div>
                    </div>

                    {/* Laporan Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex gap-2 flex-col sm:flex-row lg:gap-4'>
                            <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${laporan.Mahasiswa.profile_pict === null ?
                                        blank : laporan.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col items-center sm:items-start gap-2 self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{laporan.nama} ({laporan.Mahasiswa.prodi})</h1>
                                <p className='text-sm text-slate-500'>{laporan.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {laporan.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {laporan.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Dosen Pembimbing
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {laporan.User.name}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Komentar Dosen Pembimbing
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        {laporan.comment === null ? 'Tidak ada komentar dari dosen pembimbing' : laporan.comment}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tempat Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {laporan.tempat_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {laporan.alamat_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Longitude Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {laporan.longitude_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Latitude Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {laporan.latitude_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Dokumentasi Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`${laporan.dokumentasi}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {laporan.dokumentasi}
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
                                                            Lembar_Pengesahan_{laporan.Mahasiswa.name}.pdf
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        href={`${laporan.lembar_pengesahan}`}
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
                                                            Laporan_Magang_{laporan.Mahasiswa.name}.pdf
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        href={`${laporan.laporan_magang}`}
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
                                onClick={handleOpen}>
                                Revision
                            </button>
                            <button className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white'
                                onClick={handleAccept}>
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Section */}
            <Modal open={open} handleClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    Tuliskan revisi yang akan diberikan
                                </DialogTitle>
                                <div className="mt-1">
                                    <p className="text-xs text-gray-500">
                                        Kamu dapat menuliskan catatan revisi pada laporan magang disini.
                                    </p>
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="sop" className='text-md font-semibold text-gray-900 star-point'>Revisi Laporan</label>
                                    <textarea
                                        required
                                        name="sop"
                                        id="sop"
                                        rows={5}
                                        cols={50}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder='It is a long established fact that a reader will...'
                                        className='mt-2 text-sm ring-2 ring-secondary focus:outline-none rounded-lg w-full py-2.5 px-4 text-black-800 placeholder:opacity-50' />
                                    <p className='text-xs text-gray-500'>Write a few sentences about the revision</p>
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
        </div>
    )
}

export default DospemLaporanDetail
