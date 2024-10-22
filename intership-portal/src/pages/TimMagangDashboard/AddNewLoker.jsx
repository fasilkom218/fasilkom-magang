import React from 'react'
import FormLoker from '../../Fragments/FormLoker'

const AddNewLoker = () => {
  return (
    <div className='px-4'>
      <div className='bg-slate-50 drop-shadow-xl rounded-lg p-4'>
        <div className=''>
          <h1 className='text-lg font-bold'>Create New Internship</h1>
          <p className='text-sm text-slate-500'>You can create a new internship here.</p>
        </div>
        <div className='mt-10'>
          <FormLoker />
        </div>
      </div>
    </div>
  )
}

export default AddNewLoker
