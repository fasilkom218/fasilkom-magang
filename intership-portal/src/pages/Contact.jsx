import React from 'react'
import InputForm from '../element/InputForm/InputForm'
import office from '../assets/img/office2.jpg'
import dot from '../assets/img/dot.png'

const Contact = () => {
    return (
        <section className='container '>
            <div className='grid grid-cols-4 gap-4'>
                <div className='col-span-full md:col-span-2 p-2'>
                    <h1 className='text-xl font-bold'>Fasilkom.</h1>
                    <div className='mt-10'>
                        <h1 className='text-3xl font-bold'>Get in touch with us</h1>
                        <p className='text-md'>Write your problem or message for us and we will get back to you.</p>
                        <div className='mt-5 xl:w-[80%]'>
                            <InputForm
                                label='Name'
                                name='Name'
                                id='Name'
                                placeholder='Enter your name'
                                type='text'
                                size='mb-6'
                            />
                            <InputForm
                                label='Email'
                                name='Email'
                                id='Email'
                                placeholder='Enter your email'
                                type='email'
                                size='mb-6'
                            />
                            <div className='mb-6'>
                                <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2'>Your Message</label>
                                <textarea
                                    name="desc"
                                    id="desc"
                                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
                                    rows={3}
                                    cols={10}
                                    placeholder='Type your message here...'
                                />
                            </div>
                            <button className='w-full px-4 py-2 font-semibold bg-black text-white rounded-lg'>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='hidden md:block md:col-span-2 min-h-32 p-4 relative'>
                    <div className='lg:w-[70%] min-h-full mx-auto bg-white rounded-3xl bg-cover bg-center relative shadow-xl shadow-neutral-300' style={{ backgroundImage: `url(${office})` }}>
                        <div className='w-24 h-16 bg-white rounded-br-3xl absolute -top-3 -left-5 flex items-center justify-center'>
                            <p className='font-bold'>Fasilkom</p>
                        </div>
                        {/* <div className='w-24 h-16 bg-white rounded-tl-3xl absolute -bottom-3 -right-5 flex items-center justify-center'>
                            <p className='font-bold'>Fasilkom</p>
                        </div> */}
                        <div className='w-64 bg-black p-2 bg-opacity-25 rounded-lg absolute bottom-12 left-1/2 transform -translate-x-1/2'>
                            <h1 className='text-white text-lg text-center font-bold'>Discovering the Best Internship for Your Career</h1>
                        </div>
                    </div>
                    <div className='w-full h-full -z-10 absolute top-20 left-5 opacity-50'>
                        <img src={dot} alt="" className='' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
