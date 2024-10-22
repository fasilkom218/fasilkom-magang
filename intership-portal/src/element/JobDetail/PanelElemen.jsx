import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { foramterDate } from '../../utils/formaterDate'

const PanelElemen = ({ show }) => {
    const { jobMhs } = useSelector(state => state.jobMhs)
    return (
        <div className={`${show}`}>
            <h2 className='text-md font-semibold mt-5'>Detail Info</h2>
            <div className='mt-1 flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Salary</h1>
                    <h2 className='text-sm font-medium'>Rp. {jobMhs.salary.toLocaleString("id-ID")}</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Job Posting</h1>
                    <h2 className='text-sm font-medium'>{foramterDate(jobMhs.jobPost)}</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Deadline</h1>
                    <h2 className='text-sm font-medium'>{foramterDate(jobMhs.deadline)}</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Posisi Dibutuhkan</h1>
                    <h2 className='text-sm font-medium'>{jobMhs.maxPositions} posisi</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Maximal Pelamar</h1>
                    <h2 className='text-sm font-medium'>{jobMhs.maxApplicants} posisi</h2>
                </div>
                <div className='flex justify-between'>
                    <h1 className='text-sm font-medium'>Posisi Terisi</h1>
                    <h2 className='text-sm font-medium'>{jobMhs.acceptedCandidates} / {jobMhs.maxApplicants} posisi</h2>
                </div>
                <div className='flex justify-between mb-4'>
                    <h1 className='text-sm font-medium'>Durasi Magang</h1>
                    <h2 className='text-sm font-medium'>{jobMhs.duration} Month</h2>
                </div>
            </div>
        </div>
    )
}

export default PanelElemen
