import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { IoIosArrowRoundBack } from 'react-icons/io'
import axios from 'axios'
import { toast } from 'react-toastify'
import blank from '../../assets/img/blank.png'
import { foramterDate } from '../../utils/formaterDate'

const color = {
    "waiting": "bg-yellow-500",
    "accepted": "bg-green-500",
    "rejected": "bg-third",
}

const KaprodiRegulerDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { user } = useSelector(state => state.auth)
    const { isLoading, magang } = useSelector(state => state.magang)

    const handleAccept = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_KAPRODI}/magang-reguler/${id}`, {
                status: "accepted"
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/kaprodi-dashboard/magang-reguler')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    const handleReject = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL_KAPRODI}/magang-reguler/${id}`, {
                status: "rejected",
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/kaprodi-dashboard/magang-reguler')
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            }
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
                        <Link to={'/kaprodi-dashboard/magang-reguler'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[75%] sm:w-[60%] lg:w-[25%] xl:w-[18%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Pengajuan Magang Reguler Information</h1>
                                <p className='text-sm text-slate-500'>You can see about submission detail here.</p>
                            </div>
                            <div className={`sm:self-center px-4 py-2 ${color[magang.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                {magang.status}
                            </div>
                        </div>
                    </div>

                    {/* Magang Reguler Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex flex-col sm:flex-row gap-2 lg:gap-4'>
                            <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${magang.Mahasiswa.profile_pict === null ?
                                        blank : magang.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col items-center sm:items-start gap-2 self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{magang.nama} ({magang.Mahasiswa.prodi})</h1>
                                <p className='text-sm text-slate-500'>{magang.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {magang.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {magang.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tanggal Lahir
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {foramterDate(magang.ttl)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Agama
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {magang.agama}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {magang.alamat}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nomer Telpon
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`https://wa.me/${magang.no_telpon}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {magang.no_telpon === null ? "No magang" : magang.no_telpon}
                                            </span>
                                        </a>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nama Perusahaan / Instansi
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {magang.nama_perusahaan}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Penerima Tujuan Surat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {magang.penerima_surat}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat Perusahaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {magang.alamat_perusahaan}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nomer Telpon Perusahaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`https://wa.me/${magang.no_telpon_perusahaan}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {magang.no_telpon_perusahaan === null ? "No magang" : magang.no_telpon_perusahaan}
                                            </span>
                                        </a>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Jenis Badan Usaha
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        {magang.jenis_perusahaan === null ? "No magang" : magang.jenis_perusahaan}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Deskripsi Pekerjaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {magang.desc === null ? "No Description" : magang.desc}
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
            )}
        </div>
    )
}

export default KaprodiRegulerDetail
