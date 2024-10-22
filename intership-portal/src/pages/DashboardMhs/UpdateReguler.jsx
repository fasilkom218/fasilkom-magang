import React, { useEffect, useState } from 'react'
import InputForm from '../../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateRegulerMhs } from '../../redux/Action/PengajuanAction'
import { toast } from 'react-toastify'
import { resetPengajuan } from '../../redux/Slice/pengajuanSlice'
import { IoIosArrowRoundBack } from 'react-icons/io'

const UpdateReguler = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.loginMhs)
    const { Sukses, Eror, Loading, message, pengajuan } = useSelector(state => state.pengajuan)
    const [input, setInput] = useState({
        nama: '',
        npm: '',
        ttl: '',
        agama: '',
        alamat: '',
        no_telpon: '',
        nama_perusahaan: '',
        penerima_surat: '',
        alamat_perusahaan: '',
        no_telpon_perusahaan: '',
        jenis_perusahaan: '',
        desc: ''
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            id,
            ...input,
            token: user.token
        }

        try {
            dispatch(updateRegulerMhs(data))
            toast.success('Success update pengajuan magang reguler')
            navigate('/dashboard/magang-reguler')
        } catch (error) {
            if (error.response) {
                toast.error("Something went wrong")
            }
        }
    }

    useEffect(() => {
        const formatDate = {
            ttl: pengajuan?.ttl.slice(0, 10)
        }
        if (pengajuan) {
            setInput({
                nama: pengajuan.nama || '',
                npm: pengajuan.npm || '',
                ttl: formatDate.ttl || '',
                agama: pengajuan.agama || '',
                alamat: pengajuan.alamat || '',
                no_telpon: pengajuan.no_telpon || '',
                nama_perusahaan: pengajuan.nama_perusahaan || '',
                penerima_surat: pengajuan.penerima_surat || '',
                alamat_perusahaan: pengajuan.alamat_perusahaan || '',
                no_telpon_perusahaan: pengajuan.no_telpon_perusahaan || '',
                jenis_perusahaan: pengajuan.jenis_perusahaan || '',
                desc: pengajuan.desc || ''
            })
        }
    }, [pengajuan])
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                {/* Back Section */}
                <Link to={'/dashboard/magang-reguler'}>
                    <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[22%]'>
                        <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                        <h1 className='text-sm self-center'>Back to previous page</h1>
                    </div>
                </Link>
                <h1 className='text-lg font-bold'>Update Pengajuan Magang Reguler</h1>
                <p className='text-sm text-slate-500'>Kamu dapat mengupdate pengajuan magang reguler pada form di bawah ini.</p>
                {/* Form Section */}
                <div className='mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                            <InputForm
                                label="Nama Lengkap"
                                name="nama"
                                id="nama"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan Nama Lengkap"
                                value={input.nama}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="NPM"
                                name="npm"
                                id="npm"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan NPM Anda"
                                value={input.npm}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Tanggal Lahir"
                                name="ttl"
                                id="ttl"
                                type="date"
                                style="star-point"
                                value={input.ttl}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Agama"
                                name="agama"
                                id="agama"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan Agama Anda"
                                value={input.agama}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="No Telpon"
                                name="no_telpon"
                                id="no_telpon"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan No Telpon Anda"
                                value={input.no_telpon}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Nama Perusahaan"
                                name="nama_perusahaan"
                                id="nama_perusahaan"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan Nama Perusahaan Tempat Anda Melamar"
                                value={input.nama_perusahaan}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Penerima Surat"
                                name="penerima_surat"
                                id="penerima_surat"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan Nama Penerima Surat di Tempat Anda Melamar"
                                value={input.penerima_surat}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="No Telpon Perusahaan"
                                name="no_telpon_perusahaan"
                                id="no_telpon_perusahaan"
                                type="text"
                                style="star-point"
                                placeholder="Masukkan No Telpon Perusahaan"
                                value={input.no_telpon_perusahaan}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Jenis Perusahaan"
                                name="jenis_perusahaan"
                                id="jenis_perusahaan"
                                type="text"
                                style="star-point"
                                placeholder="Software / Network / Hardware / atau lainnya"
                                value={input.jenis_perusahaan}
                                onChange={handleInput}
                            />
                            <div className='col-span-full'>
                                <label htmlFor="alamat" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Alamat</label>
                                <textarea
                                    required
                                    name="alamat"
                                    id="alamat"
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                    rows={3}
                                    cols={10}
                                    placeholder='Jl. Raya Cempaka No.21'
                                    value={input.alamat}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className='col-span-full'>
                                <label htmlFor="alamat_perusahaan" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Alamat Perusahaan</label>
                                <textarea
                                    required
                                    name="alamat_perusahaan"
                                    id="alamat_perusahaan"
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                    rows={3}
                                    cols={10}
                                    placeholder='Jl. Raya Cempaka No.21'
                                    value={input.alamat_perusahaan}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className='col-span-full'>
                                <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Deskripsi Pekerjaan</label>
                                <textarea
                                    required
                                    name="desc"
                                    id="desc"
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                    rows={3}
                                    cols={10}
                                    placeholder='Membuat sebuah program berbasis web'
                                    value={input.desc}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className='mt-8 flex flex-col gap-2 sm:justify-start sm:flex-row-reverse'>
                            <button className='bg-secondary px-4 py-2 rounded-lg text-white font-semibold'>
                                {Loading ? <HashLoader size={20} color="white" /> : "Submit"}
                            </button>
                            <Link to={"/dashboard/magang-reguler"}>
                                <button className='w-full bg-white border border-slate-900 px-4 py-2 rounded-lg font-semibold'>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateReguler
