import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/zoom';

import { Zoom, Navigation, Pagination, EffectCreative } from 'swiper/modules';

function CustomNavButtons() {
  const swiper = useSwiper();
  return (
    <div className="absolute z-2 top-0 left-0">
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
}


export default function Swiper_Slider() {
    return (
      <section className="sticky bottom-0 h-[50vh]">
        <Swiper
          rewind={true}
          zoom={true}
          pagination={{ clickable: true }}
          //navigation={true}
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
          className="mySwiper h-[50vh]"
        >
          <SwiperSlide>
          <div className="">
            <img className="" src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="">
            <img  src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="">
            <img  src="https://placehold.co/600x400" alt="Slide 1" />
            </div>
          </SwiperSlide>
          <CustomNavButtons/>
        </Swiper>
      </section>
    );
  }
  
