import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tables from '../../components/Tables'
import { HashLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import DataNotFound from '../../components/DataNotFound'
import Pagination from '../../components/Pagination'
import { getKompetensiMhs } from '../../redux/Action/PengajuanAction'
import { color } from '../../assets/data/color'
import { foramterDate } from '../../utils/formaterDate'
import blank from '../../assets/img/blank.png'
import { IoSearchOutline } from 'react-icons/io5'

const MagangKompetensi = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const { Loading, kompetensi } = useSelector(state => state.pengajuan)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)
    const [search, setSearch] = useState('')

    const filterKompetensi = Array.isArray(kompetensi) ? kompetensi.filter(kompetensi => search.toLowerCase() === '' || kompetensi.nama.toLowerCase().includes(search.toLowerCase())) : []

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filterKompetensi.slice(firstPostIndex, lastPostIndex)
    useEffect(() => {
        dispatch(getKompetensiMhs(user.token))
    }, [dispatch])

    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-6 py-8'>
                <div className='flex flex-col gap-4 md:flex-row justify-between items-center'>
                    <div>
                        <h1 className='text-lg font-bold'>Pengajuan Magang Kompetensi</h1>
                        <p className='text-sm text-slate-500'>Kamu dapat melihat status pengajuan magang kamu disini.</p>
                    </div>
                    <a href="/dashboard/create-kompetensi">
                        <button className='bg-secondary text-white text-sm font-semibold px-4 py-2 rounded-lg'>Buat Permohonan</button>
                    </a>
                </div>
                <label htmlFor="" className='relative block mt-3'>
                    <span className='sr-only'>Search</span>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                        <IoSearchOutline className='w-5 h-5' />
                    </span>
                    <input type="text" name="search" onChange={e => setSearch(e.target.value)} placeholder="Search for anything..." className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:w-80' />
                </label>
                {/* Table Section */}
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
                            {Loading ? (
                                <tr className=''>
                                    <td colSpan={50} className='text-center' style={{ height: '100px', verticalAlign: 'middle' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <HashLoader color='#ce231c' />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                currentPost.length > 0 ? (
                                    currentPost.map((item) => (
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
                                                <Link to={`/dashboard/magang-kompetensi/${item.id}`}>
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
                                                    {search ? 'Your search result not found' : 'Belum ada pengajuan magang kompetensi'}
                                                </DataNotFound>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Tables>
                    {!Loading && (
                        <Pagination
                            postPerPage={postPerPage}
                            totalPost={filterKompetensi.length}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MagangKompetensi
