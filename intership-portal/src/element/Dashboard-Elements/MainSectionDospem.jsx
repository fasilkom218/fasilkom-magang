import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBimbingan } from '../../redux/Action/BimbinganAction'
import { getLogbook } from '../../redux/Action/LogbookAction'
import { AdjustmentsHorizontalIcon, ArrowLongRightIcon, UsersIcon } from '@heroicons/react/24/outline'
import { HashLoader } from 'react-spinners'
import blank from '../../assets/img/blank.png'
import DataNotFound from '../../components/DataNotFound'
import LogbookCard from '../../pages/DashboardMhs/LogbookCard'
import Modal from '../../components/Modal'
import LogbookContent from '../../components/Logbook/LogbookContent'
import ModalContent from '../../components/MitraLoker/ModalContent'

const MainSectionDospem = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { isLoading, bimbingan } = useSelector(state => state.bimbingan)
    const { logbook } = useSelector(state => state.logbook)
    const [sum, setSum] = useState(0)
    const bimbinganList = Array.isArray(bimbingan) ? bimbingan.slice(0, sum) : []
    const logbookList = Array.isArray(logbook) ? logbook.slice(0, sum) : []
    const [show, setShow] = useState(false)
    const [selectId, setSelectId] = useState(null)

    const handleShow = (id) => {
        setShow(!show)
        setSelectId(id)
    }

    const handleNotShow = () => setShow(!show)

    useEffect(() => {
        dispatch(getBimbingan(user.token))
        dispatch(getLogbook(user.token))
    }, [dispatch])

    useEffect(() => {
        const handleSize = () => {
            if (window.innerWidth < 1280) {
                setSum(3)
            } else {
                setSum(4)
            }
        }

        handleSize()
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize)
    }, [])

    return (
        <div className='col-span-4 xl:col-span-3 row-span-2 bg-slate-100 drop-shadow-xl min-h-56 rounded-lg'>
            <div className='flex flex-col gap-10 p-2 sm:px-8 sm:py-4'>
                <div className='min-h-56'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 self-center'>
                            <AdjustmentsHorizontalIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Bimbingan Magang</h1>
                        </div>
                        <a href={'/dospem-dashboard/bimbingan'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <button className='text-sm font-semibold'>View More</button>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </a>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            bimbinganList.length > 0 ? (
                                bimbinganList.map(item => (
                                    <div className='w-48 md:w-52 h-52 px-2 bg-slate-200 flex flex-col justify-center items-center rounded-lg gap-2' key={item.id}>
                                        <div className={`w-24 h-24 rounded-full bg-slate-100 overflow-hidden flex items-center ${item.Mahasiswa.profile_pict ? '' : 'border-2 border-slate-300'}`}>
                                            <img src={item.Mahasiswa.profile_pict ? item.Mahasiswa.profile_pict : blank} alt="" className='w-22' />
                                        </div>
                                        <div className='text-center'>
                                            <h1 className='text-lg font-semibold'>{item.Mahasiswa.name}</h1>
                                            <h2 className='text-md -mt-1'>{item.Mahasiswa.prodi}</h2>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <DataNotFound>
                                    Tidak ada mahasiswa bimbingan
                                </DataNotFound>
                            )
                        )}
                    </div>
                </div>
                <div className='min-h-56 flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UsersIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Logbook Magang</h1>
                        </div>
                        <a href={'/kaprodi-dashboard/logbook'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <p className='text-sm font-semibold'>View More</p>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </a>
                    </div>
                    <div className='flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-between'>
                        {isLoading ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            logbookList.length > 0 ? (
                                logbookList.map(item => (
                                    <div key={item.id} onClick={() => handleShow(item.id)}>
                                        <LogbookCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <div className='mx-auto'>
                                    <DataNotFound>
                                        Tidak ada logbook tersedia
                                    </DataNotFound>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Section (Show Logbook) */}
            <Modal open={show} handleClose={handleNotShow}>
                <ModalContent id={selectId} handleClose={handleNotShow} />
            </Modal>
        </div>
    )
}

export default MainSectionDospem
