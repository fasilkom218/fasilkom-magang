import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBimbingan } from '../../redux/Action/BimbinganAction'
import { IoSearchOutline } from 'react-icons/io5'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { foramterDate } from '../../utils/formaterDate'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import blank from '../../assets/img/blank.png'

const DospemBimbingan = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { isLoading, bimbingan } = useSelector((state) => state.bimbingan)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const filterBimbingan = Array.isArray(bimbingan) ? bimbingan.filter(bimbingan => search.toLowerCase() === '' || bimbingan.nama.toLowerCase().includes(search.toLowerCase())) : []
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterBimbingan.slice(firstPostIndex, lastPostIndex)

    useEffect(() => {
        dispatch(getBimbingan(user.token))
    }, [user, dispatch])

    return (
        <div className='px-4'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
                <div className='flex flex-col gap-2'>
                    <div className=''>
                        <h1 className='text-lg font-semibold'>Bimbingan Magang {user && user.name}</h1>
                        <p className='text-xs sm:text-sm'>You can see all the lists of students under your guidance.</p>
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
                                <th>Nama</th>
                                <th>NPM</th>
                                <th>Nama Pembimbing</th>
                                <th>Program Studi</th>
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
                                            <td>
                                                {item.npm}
                                            </td>
                                            <td>
                                                {item.User.name}
                                            </td>
                                            <td className={`${item.Mahasiswa.prodi === "Informatika" ? 'bg-blue-500' : 'bg-orange-500'}`}>
                                                <span
                                                    className={`text-white text-center font-bold`}
                                                >
                                                    {item.Mahasiswa.prodi}
                                                </span>
                                            </td>
                                            <td>{foramterDate(item.createdAt)}</td>
                                            <th className=''>
                                                <Link to={`/dospem-dashboard/bimbingan/${item.id}`}>
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
                                                    {search ? 'Your search result not found' : 'Belum ada mahasiswa bimbingan'}
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
                            totalPost={filterBimbingan.length}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default DospemBimbingan
