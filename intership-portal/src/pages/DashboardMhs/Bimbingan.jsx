import React from 'react'

const link = [
    {
        id: 1,
        title: "Dosen Pembimbing",
        link: "/dashboard/dosen-pembimbing"
    },
    {
        id: 2,
        title: "Laporan Magang",
        link: "/dashboard/laporan-magang"
    },
    {
        id: 3,
        title: "Nilai Magang",
        link: "/dashboard/nilai"
    },
    {
        id: 4,
        title: "Logbook Magang",
        link: "/dashboard/logbook"
    }
]
const Bimbingan = () => {
    return (
        <div className='p-4 md:w-[60%] lg:w-[68%] lg:p-8'>
            <div className='border border-slate-300 rounded-md px-4 py-2 min-h-96 overflow-hidden'>
                <h1 className='text-lg font-bold'>Bimbingan Magang</h1>
                <p className='text-sm text-slate-500'>Kamu dapat melakukan bimbingan magang disini.</p>
                {/* Form Section */}
                <div className='mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {link.map(item => (
                        <a href={item.link} key={item.id}>
                            <div className='w-56 h-32 rounded-lg border-2 border-slate-300 hover:border-black hover:text-black text-slate-600  p-2 flex justify-center items-center'>
                                <h1 className='font-bold text-lg'>{item.title}</h1>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Bimbingan
