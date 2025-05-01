import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Zoom, Navigation, Pagination, EffectCreative } from "swiper/modules";

function CustomNavButtons() {
  const swiper = useSwiper();
  return (
    <div className="absolute flex z-2 top-0 right-0">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-12 h-12 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-zinc-700" />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className="w-12 h-12 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-zinc-700" />
      </button>
    </div>
  );
}

export default function Swiper_Slider() {
  return (
    <section className="sticky bottom-60 md:bottom-20 md:h-[50vh]">
      <Swiper
        rewind={true}
        zoom={true}
        pagination={{ clickable: true }}
        //navigation={true}
        modules={[Zoom, Pagination, Navigation, EffectCreative]}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            translate: ["0%", 0, 0],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="md:h-[50vh]"
      >
        <SwiperSlide className="">
          <div className="">
            <img src="https://placehold.co/600x400" alt="Slide 1"/>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img src="https://placehold.co/600x400" alt="Slide 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="">
            <img src="https://placehold.co/600x400" alt="Slide 1" />
          </div>
        </SwiperSlide>
        <CustomNavButtons />
      </Swiper>
    </section>
  );
}
