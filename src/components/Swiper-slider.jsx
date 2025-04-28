import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/zoom';

import { Zoom, Navigation, Pagination, EffectCreative } from 'swiper/modules';


export default function Swiper_Slider() {
    return (
      <section className="hero-section">
        <Swiper
          rewind={true}
          zoom={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Zoom, Pagination, Navigation, EffectCreative]}
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-20%', 0, -1],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
          <div className="swiper-zoom-container">
            <img className="" src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-zoom-container">
            <img  src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="swiper-zoom-container">
            <img  src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    );
  }
  
