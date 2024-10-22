import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { foramterDate } from '../../utils/formaterDate'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import blank from '../../assets/img/blank.png'

const NilaiMhs = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((state) => state.loginMhs)
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const filterData = Array.isArray(data) ? data.filter(data => search.toLowerCase() === '' || data.Mahasiswa.name.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterData.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_MHS}/bobot`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setData(response.data.data)
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    toast.error(message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-6 py-8'>
                <div className='flex justify-between gap-2'>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>Nilai Mahasiswa</h1>
                        <p className='text-xs sm:text-sm'>Kamu dapat melihat nilai magang kamu disini.</p>
                    </div>
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
                                <th>Pemberi Nilai</th>
                                <th>Total Nilai</th>
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
                                                        <div className="font-bold">{item.Mahasiswa.name}</div>
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
                                                {item.Mahasiswa.npm}
                                            </td>
                                            <td>
                                                {item.User.name}
                                            </td>
                                            <td>
                                                {item.total}
                                            </td>
                                            <td>{foramterDate(item.createdAt)}</td>
                                            <th className=''>
                                                <Link to={`/dashboard/nilai/${item.id}`}>
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
                                                    {search ? 'Your search result not found' : 'Belum ada nilai'}
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
                            totalPost={filterData.length}
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

export default NilaiMhs
