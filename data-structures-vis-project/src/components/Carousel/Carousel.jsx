import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip/Tooltip.jsx';

import useSound from '../../hooks/useSound.js';
import select from '../../assets/sounds/select.mp3';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { playSound } = useSound();
  const selectSound = () => { playSound(select) };


  return (
    <div className="relative w-full max-w-3xl mx-auto my-auto">
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
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          selectSound();
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="w-64 h-96 nes-pointer flex items-center justify-center bg-gray-500 text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            {index === activeIndex ? (
              <Link to={item.Link} className="w-full h-full flex items-center justify-center">
                <Tooltip text={item.description}>
                  <div className="w-full h-full flex items-center justify-center">
                    {item.title}
                  </div>
                </Tooltip>
              </Link>
            ) : (
              item.title
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev text-gray-300 hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-button-next text-gray-300 hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default Carousel;