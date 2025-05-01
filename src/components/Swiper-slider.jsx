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
    <div className="absolute flex z-2 top-2 right-2">
      <button
        onClick={() => swiper.slidePrev()}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-blue-400" />
      </button>
      <p>&nbsp;</p>
      <button
        onClick={() => swiper.slideNext()}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-blue-400" />
      </button>
    </div>
  );
}

export default function Swiper_Slider({ images }) {
  return (
    <section className="sticky bottom-60 md:bottom-20 md:h-[50vh]">
      <Swiper
        rewind={true}
        zoom={true}
        pagination={{ clickable: false }}
        modules={[Zoom, Pagination, Navigation, EffectCreative]}
        grabCursor={true}
        className="md:h-[50vh]"
      >
        {images.map((img, idx) => (
        <SwiperSlide className="">
          <div className="swiper-zoom-container">
            <img key={idx} src={img} className="" alt={`Project ${idx}`}/>
          </div>
        </SwiperSlide>
        ))}
        <CustomNavButtons />
      </Swiper>
    </section>
  );
}
