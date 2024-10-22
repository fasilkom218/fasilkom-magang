import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { color } from '../../assets/data/color'
import { foramterDate } from '../../utils/formaterDate'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import blank from '../../assets/img/blank.png'
import { getDospemMhs } from '../../redux/Action/DospemAction'

const Laporan = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.loginMhs)
    const { dospemMhs } = useSelector((state) => state.dospem)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const filterList = Array.isArray(list) ? list.filter(list => search.toLowerCase() === "" || list.nama.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterList.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        setIsLoading(true)
        const getList = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_MHS}/laporan`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setList(response.data.data)
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    toast.error(message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getList()
    }, [])

    useEffect(() => {
        dispatch(getDospemMhs(user.token))
    }, [dispatch])

    return (
        <div className='px-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-6 py-8'>
                <div className='flex flex-col gap-4 md:flex-row justify-between items-center'>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>Laporan Magang</h1>
                        <p className='text-xs sm:text-sm'>Kamu dapat melihat laporan magang kamu di sini.</p>
                    </div>
                    {dospemMhs && dospemMhs.length > 0 ? (
                        <a href="/dashboard/create-laporan">
                            <button className='bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-lg'>Buat Laporan</button>
                        </a>
                    ) : (
                        <div className='relative group'>
                            <button disabled className='text-white text-sm font-semibold px-4 py-2 rounded-lg bg-slate-300 cursor-not-allowed'>Buat Laporan</button>
                            <p className='invisible group-hover:visible w-full absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-sm text-center rounded-md'>Kamu belum memiliki Dosepm pembimbing</p>
                        </div>
                    )}
                </div>
                <label htmlFor="" className='relative block mt-3'>
                    <span className='sr-only'>Search</span>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <IoSearchOutline className='w-5 h-5' />
                    </span>
                    <input type="text" name="search" onChange={e => setSearch(e.target.value)} placeholder="Search for anything..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
                </label>
                <div className='mt-3'>
                    <Tables>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Program Studi</th>
                                <th>NPM</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr className=''>
                                    <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <HashLoader color='#ce231c' />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentPost.length > 0 ? (
                                    currentPost.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={item.Mahasiswa.profile_pict ? item.Mahasiswa.profile_pict : blank}
                                                                alt={item.nama} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item.nama}</div>
                                                        <div className="text-sm opacity-50">{item.Mahasiswa.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`${item.Mahasiswa.prodi === "Informatika" ? 'bg-blue-500' : 'bg-orange-500'}`}>
                                                <span
                                                    className={`text-white text-center font-bold`}
                                                >
                                                    {item.Mahasiswa.prodi}
                                                </span>
                                            </td>
                                            <td>
                                                {item.npm}
                                            </td>
                                            <td>
                                                <span
                                                    className={`px-4 py-2 ${color[item.status]} rounded-lg text-white font-bold`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>{foramterDate(item.createdAt)}</td>
                                            <th className=''>
                                                <Link to={`/dashboard/laporan-magang/${item.id}`}>
                                                    <button className='px-4 py-2 rounded-md border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                        Detail
                                                    </button>
                                                </Link>
                                            </th>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className=''>
                                        <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <DataNotFound>
                                                    {search ? 'Your search result not found' : 'Belum ada laporan magang'}
                                                </DataNotFound>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Tables>
                    {!isLoading && (
                        <Pagination
                            totalPost={filterList.length}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            postPerPage={postPerPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Laporan
