import { DialogTitle } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foramterDate } from '../../utils/formaterDate'

const ModalContentMhs = ({ id, handleClose }) => {
    const dispatch = useDispatch()
    const { isLoading, infoMhs } = useSelector(state => state.infoMhs)
    const item = infoMhs.find(item => item.id === id)

    return (
        <div>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="">
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            {item.title}
                        </DialogTitle>
                        <div className='mt-2 flex gap-2'>
                            <div className='flex gap-1 self-center'>
                                <h1 className='text-sm font-semibold'>{item.author}</h1>
                                <p className='text-xs self-center font-semibold'>{" - "}{foramterDate(item.createdAt)}</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <p className='text-sm' dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    data-autofocus
                    onClick={() => handleClose()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ModalContentMhs
