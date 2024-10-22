import React from 'react'
import { banner } from '../assets/data/banner'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='sm:mb-5'>
            <Swiper
                centeredSlides={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper">
                {banner.map(item => (
                    <SwiperSlide key={item.id}>
                        <div className='hidden w-full sm:block px-4 py-4 rounded-lg' style={{ background: item.color }}>
                            <div className=' px-2 py-2 flex gap-2'>
                                <div className='w-full flex flex-col justify-between'>
                                    <div className='flex flex-col gap-8'>
                                        <h1 className='text-2xl sm:text-lg md:text-xl text-white font-extrabold'>{item.title}</h1>
                                        <p className='text-[26px] sm:text-[20px] md:text-[22px] lg:text-[24px] text-white font-semibold'>{item.desc}</p>
                                    </div>
                                    <div className=''>
                                        <button className='px-4 py-2 bg-white rounded-lg text-md font-semibold'>Learn more</button>
                                    </div>
                                </div>
                                <div className='w-[45%] bg-cover bg-top drop-shadow-xl rounded-lg' style={{ height: '220px', backgroundImage: `url(${item.img})` }}>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>

        </div>

    )
}

export default Banner
