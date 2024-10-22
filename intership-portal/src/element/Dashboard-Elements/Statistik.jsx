import { PresentationChartLineIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

const Statistik = () => {
    return (
        <div className='col-span-4 lg:col-span-2 lg:col-start-3 xl:col-span-1 bg-slate-100 drop-shadow-xl min-h-56 rounded-lg p-4'>
            <div className='flex gap-2 mb-8'>
                <PresentationChartLineIcon className='w-7 h-7' />
                <h1 className='text-lg font-semibold'>Statistik Performance</h1>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <h1 className='text-md font-semibold'>Job Created</h1>
                    <h2 className='text-md'>10 Job Created</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-md font-semibold'>Total Applicant</h1>
                    <h2 className='text-md'>20 Applicants</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-md font-semibold'>Total Accepted</h1>
                    <h2 className='text-md'>12 Applicants</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-md font-semibold'>Total Rejected</h1>
                    <h2 className='text-md'>8 Applicants</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-md font-semibold'>Total Logbook</h1>
                    <h2 className='text-md'>54 Logbook</h2>
                </div>
            </div>
        </div>
    )
}

export default Statistik
