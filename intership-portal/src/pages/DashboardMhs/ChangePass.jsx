import React from 'react'
import FormChangePassMhs from '../../Fragments/FormChangePassMhs'

const ChangePass = () => {
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                <h1 className='text-lg font-bold'>Change Password</h1>
                <div className='mt-3'>
                    <FormChangePassMhs />
                </div>
            </div>
        </div>
    )
}

export default ChangePass
