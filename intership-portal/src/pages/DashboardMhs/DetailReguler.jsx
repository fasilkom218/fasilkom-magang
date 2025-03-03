import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { color } from '../../assets/data/color'
import blank from '../../assets/img/blank.png'
import { foramterDate } from '../../utils/formaterDate'
import { toast } from 'react-toastify'
import { deleteRegulerMhs } from '../../redux/Action/PengajuanAction'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'

const DetailReguler = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.loginMhs)
    const { Loading, pengajuan } = useSelector(state => state.pengajuan)

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure want to delete this data?")
        const data = {
            id,
            token: user.token
        }
        if (confirm) {
            dispatch(deleteRegulerMhs(data))
            toast.success("Data berhasil dihapus")
            navigate('/dashboard/magang-reguler')
        }
    }

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            {Loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <HashLoader color='#CE231C' size={50} />
                </div>
            ) : (
                <div className='bg-slate-50 rounded-lg drop-shadow-lg p-4'>
                    <div className=''>
                        {/* Back Section */}
                        <Link to={'/dashboard/magang-reguler'}>
                            <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[20%]'>
                                <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                                <h1 className='text-sm self-center'>Back to previous page</h1>
                            </div>
                        </Link>
                        <div className='flex flex-col sm:flex-row gap-2 justify-between'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='text-lg font-bold'>Detail Pengajuan Magang Reguler</h1>
                                <p className='text-sm text-slate-500'>You can see about submission detail here.</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className={`sm:self-center px-4 py-2 ${color[pengajuan.status] || "border border-secondary text-secondary"} text-white rounded-lg text-center`}>
                                    {pengajuan.status}
                                </div>
                                <div className='flex gap-2 justify-center sm:self-center mt-2'>
                                    <a href={`/dashboard/update-reguler/${pengajuan.id}`}>
                                        <div className='w-8 h-8 rounded-md border border-secondary text-secondary flex items-center cursor-pointer' >
                                            <RiPencilFill className='text-sm mx-auto' />
                                        </div>
                                    </a>
                                    <div className='border-r-2 border-slate-400 h-8'></div>
                                    <div className='w-8 h-8 rounded-md bg-secondary text-white flex items-center cursor-pointer' onClick={() => handleDelete(pengajuan.id)}>
                                        <FaTrashAlt className='text-sm mx-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* pengajuan Reguler Detail */}
                    <div className='flex flex-col gap-4 mt-10'>
                        <div className='flex flex-col sm:flex-row gap-2 lg:gap-4'>
                            <div className='mx-auto sm:mx-0 w-32 h-32 rounded-lg bg-cover bg-top'
                                style={{
                                    backgroundImage: `url(${pengajuan.Mahasiswa.profile_pict === null ?
                                        blank : pengajuan.Mahasiswa.profile_pict})`
                                }}
                            />
                            <div className='flex flex-col gap-2 items-center sm:items-start self-center'>
                                <h1 className='text-lg font-semibold lg:text-xl'>{pengajuan.nama} ({pengajuan.Mahasiswa.prodi})</h1>
                                <p className='text-sm text-slate-500'>{pengajuan.Mahasiswa.email}</p>
                            </div>
                        </div>
                        <div className="mt-6 ">
                            <dl className="divide-y divide-gray-900">
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Full Name
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {pengajuan.nama}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        NPM
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {pengajuan.npm}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Tanggal Lahir
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {foramterDate(pengajuan.ttl)}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Agama
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {pengajuan.agama}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {pengajuan.alamat}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nomer Telpon
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`https://wa.me/${pengajuan.no_telpon}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {pengajuan.no_telpon === null ? "No pengajuan" : pengajuan.no_telpon}
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
                                            {pengajuan.nama_perusahaan}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Penerima Tujuan Surat
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {pengajuan.penerima_surat}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Alamat Perusahaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <span className="text-primaryColor hover:underline hover:decoration-solid">
                                            {pengajuan.alamat_perusahaan}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Nomer Telpon Perusahaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        <a href={`https://wa.me/${pengajuan.no_telpon_perusahaan}`} target="_blank" rel="noopener noreferrer">
                                            <span className="text-primaryColor hover:underline hover:decoration-solid">
                                                {pengajuan.no_telpon_perusahaan === null ? "No pengajuan" : pengajuan.no_telpon_perusahaan}
                                            </span>
                                        </a>
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Jenis Badan Usaha
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                                        {pengajuan.jenis_perusahaan === null ? "No pengajuan" : pengajuan.jenis_perusahaan}
                                    </dd>
                                </div>
                                <div className="px-4 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm leading-6 text-gray-900 font-bold">
                                        Deskripsi Pekerjaan
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {pengajuan.desc === null ? "No Description" : pengajuan.desc}
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

export default DetailReguler
