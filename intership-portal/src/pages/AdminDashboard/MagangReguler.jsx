import React, { useEffect, useState } from 'react'
import Tables from '../../components/Tables'
import { IoSearchOutline } from 'react-icons/io5'
import axios from 'axios'
import { HashLoader } from 'react-spinners'
import DataNotFound from '../../components/DataNotFound'
import { foramterDate } from "../../utils/formaterDate"
import Pagination from '../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import blank from '../../assets/img/blank.png'
import { color } from '../../assets/data/color'


const MagangReguler = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [list, setList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const filterList = Array.isArray(list) ? list.filter(item => search.toLowerCase() === '' || item.nama.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterList.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        const getList = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL_ADMIN}/magang-reguler`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                })
                setList(response.data.data)
            } catch (error) {
                if (error.response) {
                    const message = error.response.data.message
                    return message
                }
            } finally {
                setIsLoading(false)
            }
        }

        getList()
    }, [])

    return (
        <div className='px-4'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
                <div className='flex flex-col gap-2'>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>Pengajuan Permohonan Magang Reguler</h1>
                        <p className='text-xs sm:text-sm'>You can see all the magang reguler submissions here.</p>
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
                                                                src={item.Mahasiswa.profile_pict === null ? blank : item.Mahasiswa.profile_pict}
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
                                                <a href={`/admin-dashboard/magang-reguler/${item.id}`}>
                                                    <button className='px-4 py-2 rounded-md border border-black cursor-pointer hover:bg-black hover:text-white'>
                                                        Detail
                                                    </button>
                                                </a>
                                            </th>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className=''>
                                        <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                <DataNotFound>
                                                    {search ? 'Your search result not found' : 'Belum ada pengajuan magang reguler'}
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
                            postPerPage={postPerPage}
                            totalPost={filterList.length}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MagangReguler
