import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const Carousel = ({ items }) => {
  return (
    <div className="relative w-screen m-5 ">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="w-64 h-96 flex items-center justify-center bg-gray-500 text-white font-bold text-lg rounded-lg shadow-md">
            {item.title}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev text-gray-300  hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-button-next text-gray-300   hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-pagination"></div>
      
    </div>

  );
};

export default Carousel;