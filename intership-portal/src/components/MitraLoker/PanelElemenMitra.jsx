import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { foramterDate } from '../../utils/formaterDate'

const PanelElemenMitra = ({ show }) => {
    const { id } = useParams()
    const { isLoading, job } = useSelector(state => state.job)

    return (
        <div className={`${show}`}>
            <h2 className='text-md font-semibold mt-5'>Detail Info</h2>
            <div className='mt-1 flex flex-col gap-2'>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Salary</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>Rp. {job.salary.toLocaleString('id-ID')}</h2>
                </div>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Job Posting</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{foramterDate(job.jobPost)}</h2>
                </div>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Deadline</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{foramterDate(job.deadline)}</h2>
                </div>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Posisi Dibutuhkan</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{job.maxPositions} posisi</h2>
                </div>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Maximal Pelamar</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{job.maxApplicants} posisi</h2>
                </div>
                <div className='flex justify-between lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Posisi Terisi</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{job.acceptedCandidates} / {job.maxPositions} posisi</h2>
                </div>
                <div className='flex justify-between mb-4 lg:flex-col xl:flex-row'>
                    <h1 className='text-sm'>Durasi Magang</h1>
                    <h2 className='text-sm lg:font-semibold xl:font-normal'>{job.duration} Month</h2>
                </div>
            </div>
        </div>
    )
}

export default PanelElemenMitra
