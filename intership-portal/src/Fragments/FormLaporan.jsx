import React, { useEffect, useState } from 'react'
import InputForm from '../element/InputForm/InputForm'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import DataNotFound from '../components/DataNotFound'
import axios from 'axios'
import { toast } from 'react-toastify'
import { HashLoader } from 'react-spinners'
import { getDospem, getDospemMhs } from '../redux/Action/DospemAction'
import { useNavigate } from 'react-router-dom'

const FormLaporan = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.loginMhs)
    const { dospemMhs } = useSelector(state => state.dospem)
    const show = dospemMhs.filter(item => item.status === "accepted")
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState({
        nama: "",
        npm: "",
        dosen_pembimbing: "",
        tempat_magang: "",
        alamat_magang: "",
        latitude_magang: "",
        longitude_magang: "",
        lembar_pengesahan: "",
        laporan_magang: "",
        dokumentasi: "",
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
            const response = await axios.post(`${import.meta.env.VITE_API_URL_MHS}/laporan`, input, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            toast.success(response.data.message)
            navigate('/dashboard/laporan-magang')
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message
                toast.error(message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        dispatch(getDospemMhs(user.token))
    }, [dispatch])

    return (
        <div>
            {show.length > 0 ? (
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
                    </div>
                    <InputForm
                        label="Dosen Pembimbing"
                        type="text"
                        name="dosen_pembimbing"
                        id="dosen_pembimbing"
                        style="star-point"
                        placeholder="Ahmad Jalaludin, S.T., M.T."
                        size="mb-3"
                        value={input.dosen_pembimbing}
                        onChange={handleInput}
                    />
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
                    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        <div className='col-span-2 sm:col-span-1'>
                            <InputForm
                                label="Lembar Pengesahan"
                                type="text"
                                name="lembar_pengesahan"
                                id="lembar_pengesahan"
                                style="star-point"
                                size="mb-1"
                                placeholder="https://google.drive/lembarPengesahan.pdf"
                                value={input.lembar_pengesahan}
                                onChange={handleInput}
                            />
                            <p className='text-xs text-slate-500'>Drop your validity sheet here</p>
                        </div>
                        <div>
                            <InputForm
                                label="Laporan Magang"
                                type="text"
                                name="laporan_magang"
                                id="laporan_magang"
                                style="star-point"
                                size="mb-1"
                                placeholder="https://google.drive/laporanMagang.pdf"
                                value={input.laporan_magang}
                                onChange={handleInput}
                            />
                            <p className='text-xs text-slate-500'>Drop your internship report here</p>
                        </div>
                        <div className='col-span-2 mt-3'>
                            <InputForm
                                label="Dokumentasi Kegiatan"
                                type="text"
                                name="dokumentasi"
                                id="dokumentasi"
                                style="star-point"
                                size="mb-1"
                                placeholder="https://google.drive/dokumentasi.mov"
                                value={input.dokumentasi}
                                onChange={handleInput}
                            />
                            <p className='text-xs text-slate-500'>Drop your documentation here</p>
                        </div>
                    </div>
                    <Button styling='w-full bg-secondary text-white font-semibold mt-5'>
                        {isLoading ? <HashLoader color="white" size={25} /> : "Submit"}
                    </Button>
                </form>
            ) : (
                <DataNotFound>
                    Your Internship Status Has Not Been Accepted Yet
                </DataNotFound>
            )}
        </div>
    )
}

export default FormLaporan
