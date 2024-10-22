import React, { useEffect, useState } from 'react'
import InputForm from '../../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createRegulerMhs } from '../../redux/Action/PengajuanAction'
import { toast } from 'react-toastify'
import { resetPengajuan } from '../../redux/Slice/pengajuanSlice'

const CreateReguler = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { Loading, Error, Success, message } = useSelector(state => state.pengajuan)
    const { user } = useSelector(state => state.loginMhs)
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
            ...input,
            token: user.token
        }

        dispatch(createRegulerMhs(data))
    }

    useEffect(() => {
        if (Success) {
            toast.success("Success Create Pengajuan Magang Reguler")
            navigate('/dashboard/magang-reguler')
        } else if (Error) {
            toast.error(message)
            dispatch(resetPengajuan())
        }
    }, [Success, Error, dispatch, message, navigate])

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                <h1 className='text-lg font-bold'>Buat Pengajuan Magang Reguler</h1>
                <p className='text-sm text-slate-500'>Kamu dapat membuat pengajuan magang reguler pada form di bawah ini.</p>
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

export default CreateReguler
