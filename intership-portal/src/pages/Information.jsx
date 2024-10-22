import React, { useEffect, useState } from 'react'
import FAQ from '../element/Landing-Page/FAQ';
import InformationHero from '../components/Information/InformationHero';
import InternshipStatus from '../components/Information/InternshipStatus';
import Modal from '../components/Modal';
import { DialogTitle } from '@headlessui/react';
import ModalContent from '../components/Information/ModalContent';
import ModalContentMhs from '../components/Information/ModalContentMhs';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../redux/Action/LoginMhsAction';


const Information = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loginMhs)
    const [open, setOpen] = useState(false)
    const [selectId, setSelectId] = useState(null)
    const handleOpen = (id) => {
        setOpen(!open)
        setSelectId(id)
    }
    const handleClose = () => setOpen(!open)

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])
    return (
        <section className='container min-h-screen overflow-hidden'>

            {/* Information Section */}
            <InformationHero open={handleOpen} token={user.token} />

            {/* Internship Status Section */}
            <InternshipStatus token={user.token} />

            {/* FAQ Section */}
            <div className='mt-10'>
                <FAQ styling='text-left font-semibold' hide={'hidden'} size='lg:mt-3' />
            </div>

            {/* Modal Section */}
            <Modal open={open} handleClose={handleClose}>
                <ModalContentMhs id={selectId} handleClose={handleClose} />
            </Modal>
        </section>
    )
}

export default Information
