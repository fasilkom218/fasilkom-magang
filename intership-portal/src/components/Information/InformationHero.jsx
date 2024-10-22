import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { HiSpeakerphone } from "react-icons/hi";
import { Navigation } from "swiper/modules";
import InformationCard from './InformationCard';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoMhs } from '../../redux/Action/InfoMhsAction';
import DataNotFound from '../DataNotFound';
import { HashLoader } from 'react-spinners';

const InformationHero = ({ open, token }) => {
    const dispatch = useDispatch()
    const { isLoading, infoMhs } = useSelector((state) => state.infoMhs)

    useEffect(() => {
        dispatch(getInfoMhs(token))
    }, [dispatch])
    return (
        <div className='w-full sm:block px-4 py-4 rounded-lg bg-[#F5F5F5] drop-shadow-xl'>
            <div className=' px-2 py-2'>
                <div className='flex lg:px-10 gap-3'>
                    <HiSpeakerphone className='text-3xl ' />
                    <h1 className=' self-center text-xl font-bold'>Information</h1>
                </div>
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper lg:px-8"
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center mx-auto">
                            <HashLoader size={50} color='#ce231c' />
                        </div>
                    ) : (
                        infoMhs && infoMhs.length > 0 ? (
                            infoMhs.map(item => (
                                <SwiperSlide key={item.id} onClick={() => open(item.id)}>
                                    <InformationCard item={item} />
                                </SwiperSlide>
                            ))
                        ) : (
                            <DataNotFound />
                        )
                    )}
                </Swiper>

            </div>
        </div>
    )
}

export default InformationHero
