import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip/Tooltip.jsx';

import useSound from '../../hooks/useSound.js';
import select from '../../assets/sounds/select.mp3';
import cardPicking from '../../assets/sounds/card-picking.mp3';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { playSound } = useSound();
  const selectSound = () => { playSound(select) };
  const cardPickingSound = () => { playSound(cardPicking) };

  const imagesMap = {
    0: '/main-menu/tictactoeCard.png',
    1: '/main-menu/stacksCard.png',
    2: '/main-menu/queueCard.png',
    3: '/main-menu/bttCard.png',
    4: '/main-menu/bstCard.png',
    5: '/main-menu/tohCard.png',
    6: '/main-menu/sortingCard.png',
  };


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
          cardPickingSound();
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="w-64 h-96 nes-pointer flex items-center justify-center bg-[#262137]  text-white font-bold text-lg rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative">
            {index === activeIndex ? (
                <Link to={item.Link} className="w-full h-full flex items-center justify-center relative">
                  <Tooltip text={item.title} optionalText={item.description}  >
                    <img src={imagesMap[index]} alt={item.title}   className="w-full h-full object-cover image-rendering fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />
                  </Tooltip>

                </Link>
            ) : (
              <img src={imagesMap[index]} alt={item.title} className="w-full h-full image-rendering"/>
            )}
            
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev text-gray-300 hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-button-next text-gray-300 hover:text-white active:scale-110 transition-transform duration-200"></div>
      <div className="swiper-pagination "></div>
    </div>
  );
};

export default Carousel;