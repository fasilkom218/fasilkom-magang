import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDospemById, getListDosen, updateDospem } from '../../redux/Action/DospemAction'
import { HashLoader } from 'react-spinners'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { PaperClipIcon, PencilIcon } from '@heroicons/react/24/outline'
import { foramterDate } from '../../utils/formaterDate'
import { toast } from 'react-toastify'
import blank from '../../assets/img/blank.png'

const color = {
    "waiting": "bg-yellow-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
}

const KaprodiDospemDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const { isLoading, dospem, dosenList, isSuccess, isError, message } = useSelector(state => state.dospem)
    const [dosen, setDosen] = useState(null)
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            id: id,
            token: user.token,
            dospemId: dosen
        }

        dispatch(updateDospem(data))
        if (isSuccess) {
            toast.success("Success given dosen pembimbing for student")
            navigate('/kaprodi-dashboard/dosen-pembimbing')
        } else if (isError) {
            toast.error(message)
        }
    }

    useEffect(() => {
        dispatch(getListDosen(user.token))
    }, [dispatch])

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
                        <Link to={'/kaprodi-dashboard/dosen-pembimbing'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[75%] sm:w-[60%] lg:w-[25%] xl:w-[18%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Detail Dosen Pembimbing Magang</h1>
                                <p className='text-sm text-slate-500'>You can see about dosen pembimbing submission detail here.</p>
                            </div>
                            <div className={`sm:self-center px-4 py-2 ${color[dospem.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                {dospem.status}
                            </div>
                        </div>
                    </div>

                    {/* Magang Reguler Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex gap-2 flex-col sm:flex-row lg:gap-4'>
                            <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${dospem.Mahasiswa.profile_pict === null ?
                                        blank : dospem.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col gap-2 items-center sm:items-start self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{dospem.nama} ({dospem.Mahasiswa.prodi})</h1>
                                <p className='text-sm text-slate-500'>{dospem.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {dospem.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {dospem.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Dosen Pembimbing
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex gap-2">
                                        {dospem.dospemId !== null && !open ? (
                                            <p className='text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 '>{dospem.User.name}</p>
                                        ) : (
                                            <form onSubmit={handleSubmit}>
                                                <div className='flex gap-3'>
                                                    <select name="dosen" id="dosen" value={dosen} onChange={(e) => setDosen(e.target.value)} className='text-sm border border-primary rounded py-2 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                                        <option value="">Pilih Dosen Pembimbing</option>
                                                        {dosenList.map(item => (
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                    <button className='bg-secondary text-white px-4 py-1 h-10 rounded-md font-semibold'>
                                                        {isLoading ? <HashLoader color="white" size={20} /> : "Save"}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                        <button className={`bg-secondary text-white px-2 py-1 rounded-md font-semibold`} onClick={handleOpen}>
                                            <PencilIcon className='w-4 h-4 font-bold' />
                                        </button>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tempat Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        {dospem.tempat_magang}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.alamat_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        PIC Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.pic}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nomer Telpon PIC
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`https://wa.me/${dospem.kontak_pic}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {dospem.kontak_pic === null ? "No Data" : dospem.kontak_pic}
                                            </span>
                                        </a>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Longitude Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.longitude_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Latitude Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.latitude_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tanggal Mulai Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {foramterDate(dospem.tanggal_mulai)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tanggal Selesai Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {foramterDate(dospem.tanggal_selesai)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Bidang Minat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.bidang_minat}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Rencana Magang
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {dospem.rencana_magang}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Surat Covid
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
                                                            Surat_Covid_{dospem.Mahasiswa.name}.pdf
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        href={`${dospem.surat_covid}`}
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
                                        Surat Balasan Tempat Magang
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
                                                            Surat_Balasan_{dospem.Mahasiswa.name}.pdf
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <a
                                                        href={`${dospem.lembar_pengesahan}`}
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
    )
}

export default KaprodiDospemDetail
