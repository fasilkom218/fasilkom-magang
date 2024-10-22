import React, { useEffect, useState } from 'react'
import InputForm from '../../element/InputForm/InputForm'
import { HashLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createKompetensiMhs } from '../../redux/Action/PengajuanAction'
import { toast } from 'react-toastify'
import { resetPengajuan } from '../../redux/Slice/pengajuanSlice'

const CreateKompetensi = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { Loading, Error, Success, message } = useSelector(state => state.pengajuan)
    const { user } = useSelector(state => state.loginMhs)
    const [input, setInput] = useState({
        nama: '',
        npm: '',
        anggota: '',
        nama_kompetisi: '',
        tingkat_kompetisi: '',
        tanggal_kompetisi: '',
        linkWeb: '',
        bidang_minat: '',
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

        dispatch(createKompetensiMhs(data))
    }

    useEffect(() => {
        if (Success) {
            toast.success("Pengajuan kompetensi created successfully")
            navigate('/dashboard/magang-kompetensi')
        } else if (Error) {
            toast.error(message)
            dispatch(resetPengajuan())
        }
    }, [Success, Error, message, dispatch, navigate])
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                <h1 className='text-lg font-bold'>Buat Pengajuan Magang Kompetensi</h1>
                <p className='text-sm text-slate-500'>Kamu dapat membuat pengajuan magang kompetensi pada form di bawah ini.</p>
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
                                label="Nama Kompetisi"
                                name="nama_kompetisi"
                                id="nama_kompetisi"
                                type="text"
                                style="star-point"
                                placeholder="Hackathon Indonesia"
                                value={input.nama_kompetisi}
                                onChange={handleInput}
                            />
                            <div className='col-span-full'>
                                <label htmlFor="anggota" className='block text-sm font-bold text-slate-600 mb-2'>Anggota (Kosongkan Jika Tidak Ada)</label>
                                <textarea
                                    name="anggota"
                                    id="anggota"
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                    rows={3}
                                    cols={10}
                                    placeholder={`Jhon Doe - 2010631170001 \n Angela Tanuwarman - 2010631170002`}
                                    value={input.anggota}
                                    onChange={handleInput}
                                />
                            </div>
                            <InputForm
                                label="Tingkat Kompetisi"
                                name="tingkat_kompetisi"
                                id="tingkat_kompetisi"
                                type="text"
                                style="star-point"
                                placeholder="Nasional / Internasional"
                                value={input.tingkat_kompetisi}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Tanggal Kompetisi"
                                name="tanggal_kompetisi"
                                id="tanggal_kompetisi"
                                type="text"
                                style="star-point"
                                placeholder="02 Oktober 2024 - 05 Oktober 2024"
                                value={input.tanggal_kompetisi}
                                onChange={handleInput}
                            />
                            <InputForm
                                label="Link Web Kompetisi / Media Sosial"
                                name="linkWeb"
                                id="linkWeb"
                                type="text"
                                style="star-point"
                                placeholder="https://hackathonindonesia.com"
                                value={input.linkWeb}
                                onChange={handleInput}
                            />
                            <div className='col-span-full'>
                                <label htmlFor="bidang_minat" className='block star-point text-sm font-bold text-slate-600 mb-2 star-point'>Bidang Minat</label>
                                <select required name="bidang_minat" id="bidang_minat" value={input.bidang_minat} onChange={handleInput} className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                    <option value="">Choose One Interest Field</option>
                                    <option value="software">Software Engineering</option>
                                    <option value="network">Computer Network</option>
                                    <option value="data">Data Science</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-8 flex flex-col gap-2 sm:justify-start sm:flex-row-reverse'>
                            <button className='bg-secondary px-4 py-2 rounded-lg text-white font-semibold'>
                                {Loading ? <HashLoader size={20} color="white" /> : "Submit"}
                            </button>
                            <Link to={"/dashboard/magang-kompetisi"}>
                                <button className='w-full bg-white border border-slate-900 px-4 py-2 rounded-lg font-semibold'>Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateKompetensi
