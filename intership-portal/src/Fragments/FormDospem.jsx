import React, { useEffect, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'

const FormDospem = () => {
    const { user } = useSelector(state => state.loginMhs)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        nama: "",
        npm: "",
        surat_covid: "",
        surat_balasan: "",
        tempat_magang: "",
        alamat_magang: "",
        pic: "",
        kontak_pic: "",
        latitude_magang: "",
        longitude_magang: "",
        tgl_mulai: "",
        tgl_selesai: "",
        bidang_minat: "",
        rencana_magang: "",
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL_MHS}/dosen-pembimbing`, input, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/dashboard/dosen-pembimbing')
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message
                toast.error(message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                    <InputForm
                        label="Nama"
                        type="text"
                        name="nama"
                        id="nama"
                        style="star-point"
                        placeholder="Gong Yoo"
                        size="mb-3"
                        value={input.nama}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="NPM"
                        type="text"
                        name="npm"
                        id="npm"
                        style="star-point"
                        size="mb-3"
                        placeholder="2010631170126"
                        value={input.npm}
                        onChange={handleInput}
                    />
                    <div className='mb-3'>
                        <InputForm
                            label="Surat Covid"
                            type="text"
                            name="surat_covid"
                            id="surat_covid"
                            style="star-point"
                            size="mb-1"
                            placeholder="https://google.drive/SuratCovid.pdf"
                            value={input.surat_covid}
                            onChange={handleInput}
                        />
                        <p className='text-xs text-slate-500'>Template Surat Covid {" "}
                            <a href="https://drive.google.com/file/d/1usMTJP76VYe6pXkqz8kmCXyEuA1O1BqM/view" target='_blank'>
                                Click Me
                            </a>
                        </p>
                    </div>
                    <div className='mb-3'>
                        <InputForm
                            label="Surat Balasan"
                            type="text"
                            name="surat_balasan"
                            id="surat_balasan"
                            style="star-point"
                            size="mb-1"
                            placeholder="https://google.drive/SuratBalasan.pdf"
                            value={input.surat_balasan}
                            onChange={handleInput}
                        />
                        <p className='text-xs text-slate-500'>Upload Surat Balasan di sini</p>
                    </div>
                </div>
                <InputForm
                    label="Tempat Magang"
                    type="text"
                    name="tempat_magang"
                    id="tempat_magang"
                    style="star-point"
                    placeholder="PT. ImpactByte Teknologi Edukasi"
                    size="mb-3"
                    value={input.tempat_magang}
                    onChange={handleInput}
                />
                <div className='mb-3'>
                    <label htmlFor="alamat_magang" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Alamat Magang</label>
                    <textarea
                        required
                        name="alamat_magang"
                        id="alamat_magang"
                        className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                        rows={3}
                        cols={10}
                        value={input.alamat_magang}
                        onChange={handleInput}
                        placeholder='Jl. Raya Cempaka No.21' />
                </div>

                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                    <InputForm
                        label="PIC"
                        type="text"
                        name="pic"
                        id="pic"
                        style="star-point"
                        size="mb-3"
                        placeholder="Ismail Fajar"
                        value={input.pic}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Kontak PIC"
                        type="number"
                        name="kontak_pic"
                        id="kontak_pic"
                        style="star-point"
                        size="mb-3"
                        placeholder="081322022050"
                        value={input.kontak_pic}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Latitude Magang"
                        type="text"
                        name="latitude_magang"
                        id="latitude_magang"
                        style="star-point"
                        size="mb-3"
                        placeholder="-6.224532326012708"
                        value={input.latitude_magang}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Longitude Magang"
                        type="text"
                        name="longitude_magang"
                        id="longitude_magang"
                        style="star-point"
                        size="mb-3"
                        placeholder="106.80549783549778"
                        value={input.longitude_magang}
                        onChange={handleInput}
                    />
                </div>
                <div className='grid grid-cols-1 gap-2 sm:grid-cols-3 mt-3'>
                    <InputForm
                        label="Tanggal Mulai"
                        type="date"
                        name="tgl_mulai"
                        id="tgl_mulai"
                        style="star-point"
                        size="mb-3"
                        value={input.tgl_mulai}
                        onChange={handleInput}
                    />
                    <InputForm
                        label="Tanggal Selesai"
                        type="date"
                        name="tgl_selesai"
                        id="tgl_selesai"
                        style="star-point"
                        size="mb-3"
                        value={input.tgl_selesai}
                        onChange={handleInput}
                    />
                    <div>
                        <label htmlFor="bidang_minat" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Bidang Minat</label>
                        <select required name="bidang_minat" id="bidang_minat" value={input.bidang_minat} onChange={handleInput} className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                            <option value="">Choose One Interest Field</option>
                            <option value="Software Engineering">Software</option>
                            <option value="Computer Network">Network</option>
                            <option value="Data Science">Data</option>
                        </select>
                    </div>
                </div>
                <div className='mt-3'>
                    <label htmlFor="rencana_magang" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Rencana Magang</label>
                    <textarea
                        required
                        name="rencana_magang"
                        id="rencana_magang"
                        className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                        rows={3}
                        cols={10}
                        value={input.rencana_magang}
                        onChange={handleInput}
                        placeholder='Membuat website untuk perusahaan' />
                </div>
                <Button styling='w-full bg-secondary text-white font-semibold mt-5'>
                    {isLoading ? <HashLoader color="white" size={25} /> : "Submit"}
                </Button>
            </form>
        </div>
    )
}

export default FormDospem
