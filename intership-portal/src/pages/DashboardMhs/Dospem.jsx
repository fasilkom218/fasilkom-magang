import React from 'react'
import FormDospem from '../../Fragments/FormDospem'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from 'react-icons/io'

const Dospem = () => {
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2'>
                {/* Back Section */}
                <Link to={'/dashboard/dosen-pembimbing'}>
                    <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-[60%] lg:w-[22%]'>
                        <IoIosArrowRoundBack className='text-3xl group-hover:-rotate-45 transition ease-in duration-200' />
                        <h1 className='text-sm self-center'>Back to previous page</h1>
                    </div>
                </Link>
                <h1 className='text-lg font-bold'>Pengajuan Dosen Pembimbing</h1>
                <p className='text-sm text-slate-500'>You can apply for an internship supervisor here.</p>
                {/* Form Section */}
                <div className='mt-5'>
                    <FormDospem />
                </div>
            </div>
        </div>
    )
}

export default Dospem
