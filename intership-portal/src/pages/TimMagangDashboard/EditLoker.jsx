import React from 'react'
import FormUpdateLoker from '../../Fragments/FormUpdateLoker'

const EditLoker = () => {
    return (
        <div className='px-4'>
            <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
                <div className=''>
                    <h1 className='text-lg font-bold'>Update Internship</h1>
                    <p className='text-sm text-slate-500'>You can update a internship here.</p>
                </div>
                <div className='mt-10'>
                    <FormUpdateLoker />
                </div>
            </div>
        </div>
    )
}

export default EditLoker
