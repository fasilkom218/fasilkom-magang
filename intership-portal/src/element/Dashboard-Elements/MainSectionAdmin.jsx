import { AdjustmentsHorizontalIcon, ArrowLongRightIcon, UsersIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import DataNotFound from '../../components/DataNotFound'
import { getInfo } from '../../redux/Action/InformationAction'
import InformationCard from '../../components/Information/InformationCard'
import { getAccount } from '../../redux/Action/CreateAccountAction'
import Modal from '../../components/Modal'
import ModalContent from '../../components/Information/ModalContent'
import blank from '../../assets/img/blank.png'

const MainSectionAdmin = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { isLoading, info } = useSelector(state => state.info)
    const { account } = useSelector(state => state.account)
    const [sum, setSum] = useState(0)
    const infoList = Array.isArray(info) ? info.slice(0, 2) : []
    const accountList = Array.isArray(account) ? account.slice(0, sum) : []
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const handleOpen = (id) => {
        setOpen(!open)
        setSelectedId(id)
    }

    const handleClose = () => setOpen(!open)

    useEffect(() => {
        dispatch(getInfo(user.token))
        dispatch(getAccount(user.token))
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
        <div className='col-span-4 xl:col-span-3 row-span-2 bg-slate-100 drop-shadow-xl min-h-56 rounded-lg overflow-hidden'>
            <div className='flex flex-col gap-10 p-2 sm:px-8 sm:py-4'>
                <div className='min-h-56'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 self-center'>
                            <AdjustmentsHorizontalIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Information</h1>
                        </div>
                        <Link to={'/admin-dashboard/information'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <button className='text-sm font-semibold'>View More</button>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </Link>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <div className='flex items-center justify-center col-span-full'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            infoList.length > 0 ? (
                                infoList.map(item => (
                                    <div key={item.id} onClick={() => handleOpen(item.id)}>
                                        <InformationCard item={item} />
                                    </div>
                                ))
                            ) : (
                                <DataNotFound>
                                    No Information Available
                                </DataNotFound>
                            )
                        )}
                    </div>
                </div>
                <div className='min-h-56 flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <UsersIcon className='w-7 h-7' />
                            <h1 className='text-lg font-semibold'>Account</h1>
                        </div>
                        <Link to={'/admin-dashboard/create-account'}>
                            <div className='px-4 py-2 rounded-lg text-black flex gap-2 hover:bg-blue-500 hover:text-white transition-colors ease-in-out duration-200 cursor-pointer'>
                                <p className='text-sm font-semibold'>View More</p>
                                <ArrowLongRightIcon className='w-5' />
                            </div>
                        </Link>
                    </div>
                    <div className='flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-between'>
                        {isLoading ? (
                            <div className='mx-auto'>
                                <HashLoader size={50} color='#ce231c' />
                            </div>
                        ) : (
                            accountList.length > 0 ? (
                                accountList.map(item => (
                                    <div className='w-48 md:w-52 h-52 px-2 bg-slate-200 flex flex-col justify-center items-center rounded-lg gap-2' key={item.id}>
                                        <div className={`w-24 h-24 rounded-full bg-slate-100 overflow-hidden flex items-center ${item.profile ? '' : 'border-2 border-slate-300'}`}>
                                            <img src={item.profile ? item.profile : blank} alt="" className='w-22' />
                                        </div>
                                        <div className='text-center'>
                                            <h1 className='text-lg font-semibold'>{item.name}</h1>
                                            <h2 className='text-md -mt-1'>{item.role}</h2>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='mx-auto'>
                                    <DataNotFound>
                                        No Account Available
                                    </DataNotFound>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            <Modal open={open} handleClose={handleClose}>
                <ModalContent id={selectedId} handleClose={handleClose} />
            </Modal>
        </div>
    )
}

export default MainSectionAdmin
