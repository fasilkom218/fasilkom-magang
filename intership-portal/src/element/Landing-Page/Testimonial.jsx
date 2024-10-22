import React from "react";
import student from "../../assets/img/student-3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";
// import required modules
import { Navigation } from "swiper/modules";
import { testimoni } from "../../assets/data/testimonial";
import { Link } from "react-router-dom";

const Testimonial = () => {
  return (
    <>
      <div className="w-full sm:flex sm:gap-4 sm:justify-between">
        <div className='min-h-32 flex items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-extrabold'>Inspiring Testimonials From <span className='block'>Our Thriving Internship Alumni 🌟</span></h1>
            <p className='sm:w-[80%] md:w-[100%] lg:w-[95%]'>Explore inspiring stories from our successful internship alumni and see how their experiences with us have shaped their thriving careers.</p>
            <div className='flex gap-2'>
              <Link to={"/started"}>
                <button className='px-4 xl:px-6 py-2 bg-black drop-shadow-lg font-semibold text-white flex gap-2 rounded-lg'>Sign Up</button>
              </Link>
              <button className='px-4 xl:px-6 py-2 border-2 border-black font-semibold text-black flex gap-2 rounded-lg hover:bg-black hover:text-white transition-colors ease-in-out duration-200'>Learn More</button>
            </div>
          </div>
        </div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          {testimoni.map(item => (
            <SwiperSlide key={item.id}>
              <div className="w-full h-48 flex items-center justify-center">
                <div className="bg-[#f5f5f5] drop-shadow-lg rounded-lg mt-3 sm:mt-0 lg:w-[80%]">
                  <div className="h-20 px-2 py-2 flex gap-2 lg:px-4 lg:py-4 lg:h-24">
                    <div className="w-20 flex bg-top bg-cover rounded-md" style={{ backgroundImage: `url(${item.img})` }}>
                    </div>
                    <div className="self-center">
                      <h1 className="text-lg font-bold">{item.name}</h1>
                      <h2 className="text-sm font-semibold">{item.company}</h2>
                    </div>
                  </div>
                  <div className="px-2 pb-2 lg:px-4 lg:pb-4">
                    <p className="text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </>
  );
};

export default Testimonial;
