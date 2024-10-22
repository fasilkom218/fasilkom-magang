import React, { useState } from "react";
import { faq } from "../../assets/data/faq";
import image from '../../assets/img/faq.png'
import meta from '../../assets/img/cmp-3.png'
import google from '../../assets/img/cmp-1.png'
import subway from '../../assets/img/cmp-13.png'
import dropbox from '../../assets/img/cmp-4.png'
import microsoft from '../../assets/img/cmp-6.png'
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";

const containerVariants = {
  close: {
    height: "3.5rem",
    transition: {
      type: "spring",
      duration: 0.3,
    }
  },
  open: {
    height: "10rem",
    transition: {
      type: "spring",
      duration: 0.3,
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: "auto" },
}

const svgVariants = {
  close: {
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  open: {
    rotate: 180,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

const FAQ = () => {
  const [openId, setOpenId] = useState(null)

  const handleClose = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div>
      <div className='text-3xl font-extrabold'>Frequently Asked Questions (FAQ)</div>
      <p className='mt-1 text-slate-500 font-medium sm:w-[90%] md:w-[80%] xl:w-[60%]'>Browse our FAQ section for detailed answers to common inquiries, providing the essential information you need to navigate our services and make informed decisions.</p>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5 relative'>
        <div className='hidden sm:block sm:mb-16 lg:mb-0 min-h-32 overflow-hidden xl:overflow-visible'>
          <div className='relative drop-shadow-lg -mt-4 '>
            <img src={image} alt="" className='mx-auto' />
            <div className='w-72 h-40 p-2 rounded-lg bg-white absolute -bottom-28 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='flex gap-2'>
                <div className='w-10 h-10 bg-slate-200 rounded-full bg-cover bg-top' style={{ backgroundImage: `url(${image})` }}></div>
                <div className='flex flex-col'>
                  <h1 className='font-extrabold'>Valerina Christie</h1>
                  <h2 className='text-sm text-slate-700 text-bold -mt-1'>Internship Alumni in Meta</h2>
                </div>
              </div>
              <p className='text-sm mt-2'>This internship challenged me, enhanced my skills, and prepared me for future success with invaluable experiences.</p>
              <p className='text-sm mt-2 font-bold'>⭐⭐⭐⭐⭐ (Best Intern)</p>
            </div>
            <div className='w-20 h-20 bg-slate-100 absolute bottom-20 right-32 rounded-lg flex items-center'>
              <img src={meta} alt="" className='w-20 ' />
            </div>
            <div className='w-20 h-20 bg-slate-100 absolute top-20 left-16 rounded-lg flex items-center animate-bounce-slow'>
              <img src={google} alt="" className='w-20 ' />
            </div>
            <div className='w-20 h-20 bg-slate-100 absolute top-20 right-16 rounded-lg flex items-center animate-bounce-slow'>
              <img src={microsoft} alt="" className='w-20 ' />
            </div>
            <div className='w-20 h-20 bg-slate-100 absolute -bottom-0 -left-0 rounded-lg flex items-center animate-bounce-slow'>
              <img src={dropbox} alt="" className='w-20 ' />
            </div>
            <div className='w-20 h-20 bg-slate-100 absolute -bottom-0 right-5 rounded-lg flex items-center animate-bounce-slow'>
              <img src={subway} alt="" className='w-20 ' />
            </div>
            <div className='w-[28rem] h-[27rem] rounded-full border -z-10 absolute top-60 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
            <div className='w-[25rem] h-[24rem] rounded-full border -z-10 absolute top-60 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
            <div className='w-[22rem] h-[21rem] rounded-full border -z-10 absolute top-60 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
            <div className='w-[19rem] h-[18rem] rounded-full border -z-10 absolute top-60 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
          </div>
        </div>
        <div className='cursor-pointer'>
          {faq.map(item => (
            <motion.div
              variants={containerVariants}
              animate={openId === item.id ? 'open' : 'close'}
              initial="close"
              className={`bg-[#f5f5f5] rounded-lg drop-shadow-lg relative mb-4 ${openId === item.id ? 'z-10' : ''}`}
              key={item.id}
            >
              <div className='flex justify-between p-4' onClick={() => handleClose(item.id)}>
                <h1 className='text-lg font-bold'>{item.title}</h1>
                <IoIosArrowUp className={`self-center ${openId === item.id ? 'rotate-180' : ''} transition ease-in duration-200`} />
              </div>
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    variants={textVariants}
                    animate="visible"
                    initial="hidden"
                    transition={{ duration: 0.2 }}
                    className='px-4 text-sm font-medium text-slate-500'>
                    {item.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ;
