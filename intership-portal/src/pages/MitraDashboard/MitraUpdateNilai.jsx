import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBimbinganMitra } from '../../redux/Action/BimbinganAction'
import InputForm from '../../element/InputForm/InputForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { updateNilaiMitra } from '../../redux/Action/NilaiAction'
import { toast } from 'react-toastify'

const MitraUpdateNilai = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { bimbinganMitra } = useSelector(state => state.bimbingan)
    const { nilai } = useSelector(state => state.nilai)
    const { user } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        disiplin: null,
        sikap: null,
        tanggung_jawab: null,
        kehadiran: null,
        tata_tertib: null,
        penampilan: null,
        kemampuan_kerja: null,
        kualitas_kerja: null,
        keterampilan_kerja: null,
        kemampuan_berkomunikasi: null,
        kerjasama: null,
        kerajinan: null,
        percaya_diri: null,
        relevansi: null,
        isi_laporan: null,
        mhsId: nilai.mhsId
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
            dispatch(updateNilaiMitra(data))
            toast.success('Nilai berhasil diperbarui')
            navigate('/mitra-dashboard/nilai')
        } catch (error) {
            toast.error("Nilai gagal diperbarui")
        }
    }

    useEffect(() => {
        if (nilai) {
            setInput({
                disiplin: nilai.disiplin || null,
                sikap: nilai.sikap || null,
                tanggung_jawab: nilai.tanggung_jawab || null,
                kehadiran: nilai.kehadiran || null,
                tata_tertib: nilai.tata_tertib || null,
                penampilan: nilai.penampilan || null,
                kemampuan_kerja: nilai.kemampuan_kerja || null,
                kualitas_kerja: nilai.kualitas_kerja || null,
                keterampilan_kerja: nilai.keterampilan_kerja || null,
                kemampuan_berkomunikasi: nilai.kemampuan_berkomunikasi || null,
                kerjasama: nilai.kerjasama || null,
                kerajinan: nilai.kerajinan || null,
                percaya_diri: nilai.percaya_diri || null,
                relevansi: nilai.relevansi || null,
                isi_laporan: nilai.isi_laporan || null,
                mhsId: nilai.mhsId
            })
        }
        dispatch(getBimbinganMitra(user.token))
    }, [dispatch, nilai])


    return (
        <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
            <Link to={'/mitra-dashboard/nilai'}>
                <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[75%] sm:w-[60%] lg:w-[25%] xl:w-[18%]'>
                    <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                    <h1 className='text-sm self-center'>Back to previous page</h1>
                </div>
            </Link>
            <div className=''>
                <h1 className='text-lg font-bold'>Berikan Penilaian Magang</h1>
                <p className='text-sm text-slate-500'>You can Update a new internship here.</p>
            </div>
            <div className='mt-10'>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        <div className=''>
                            <label htmlFor="mhsId" className='block text-sm font-bold text-slate-600 mb-2 star-point'>Mahasiswa Bimbingan</label>
                            <select required name="mhsId" id="mhsId" value={input.mhsId} onChange={handleInput} className='text-sm border w-full border-primary rounded py-2 px-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                                <option value="">Pilih Mahasiswa</option>
                                {bimbinganMitra.map(item => (
                                    <option key={item.Mahasiswa.id} value={item.Mahasiswa.id}>{item.Mahasiswa.name}</option>
                                ))}
                            </select>
                        </div>
                        <InputForm
                            label="Kedisiplinan"
                            name="disiplin"
                            id="disiplin"
                            type="number"
                            style="star-point"
                            value={input.disiplin}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Sikap Kerja / Prosedur Kerja"
                            name="sikap"
                            id="sikap"
                            type="number"
                            style="star-point"
                            value={input.sikap}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Tanggung Jawab"
                            name="tanggung_jawab"
                            id="tanggung_jawab"
                            type="number"
                            style="star-point"
                            value={input.tanggung_jawab}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Kehadiran"
                            name="kehadiran"
                            id="kehadiran"
                            type="number"
                            style="star-point"
                            value={input.kehadiran}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Tata Tertib"
                            name="tata_tertib"
                            id="tata_tertib"
                            type="number"
                            style="star-point"
                            value={input.tata_tertib}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Penampilan"
                            name="penampilan"
                            id="penampilan"
                            type="number"
                            style="star-point"
                            value={input.penampilan}
                            onChange={handleInput}

                        />
                        <InputForm
                            label="Kemampuan Kerja"
                            name="kemampuan_kerja"
                            id="kemampuan_kerja"
                            type="number"
                            style="star-point"
                            value={input.kemampuan_kerja}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Kualitas Kerja"
                            name="kualitas_kerja"
                            id="kualitas_kerja"
                            type="number"
                            style="star-point"
                            value={input.kualitas_kerja}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Keterampilan Kerja"
                            name="keterampilan_kerja"
                            id="keterampilan_kerja"
                            type="number"
                            style="star-point"
                            value={input.keterampilan_kerja}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Kemampuan Berkomunikasi"
                            name="kemampuan_berkomunikasi"
                            id="kemampuan_berkomunikasi"
                            type="number"
                            style="star-point"
                            value={input.kemampuan_berkomunikasi}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Kerjasama"
                            name="kerjasama"
                            id="kerjasama"
                            type="number"
                            style="star-point"
                            value={input.kerjasama}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Kerajinan / Inisiatif"
                            name="kerajinan"
                            id="kerajinan"
                            type="number"
                            style="star-point"
                            value={input.kerajinan}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Percaya Diri"
                            name="percaya_diri"
                            id="percaya_diri"
                            type="number"
                            style="star-point"
                            value={input.percaya_diri}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Relevansi Laporan"
                            name="relevansi"
                            id="relevansi"
                            type="number"
                            style="star-point"
                            value={input.relevansi}
                            onChange={handleInput}
                        />
                        <InputForm
                            label="Isi Laporan"
                            name="isi_laporan"
                            id="isi_laporan"
                            type="number"
                            style="star-point"
                            value={input.isi_laporan}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='flex flex-col-reverse gap-2 sm:justify-start sm:flex-row-reverse'>
                        <button className='px-4 py-2 bg-secondary text-white font-semibold rounded-lg'>
                            Submit
                        </button>
                        <Link to={"/mitra-dashboard/nilai"}>
                            <button className='px-4 py-2 border border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MitraUpdateNilai
