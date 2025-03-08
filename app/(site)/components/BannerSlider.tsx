"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function BannerSlider() {
  return (
    <div className="w-full  py-1 mx-auto z-0 mb-8 md:mb-10">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper rounded-md"
      >
        <SwiperSlide>
          <div className="w-full h-[300px] md:h-[350px]">
            <picture>
              <source
                srcSet="/slider-images/Taylor-lg.jpg"
                media="(min-width: 1024px)"
              />
              <img
                src="/slider-images/Taylor-mobile.jpg"
                alt="Taylor"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-full h-[300px] md:h-[350px] ">
            <picture className=" object-cover">
              <source
                srcSet="/slider-images/Weekend2400.jpg"
                media="(min-width: 1024px)"
              />
              <img
                src="/slider-images/Weekend-mobile"
                alt="Weekend"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className=" w-full h-[300px] md:h-[350px] ">
            <picture className=" object-cover">
              <source
                srcSet="/slider-images/Ariana-lg.jpg"
                media="(min-width: 1024px)"
              />
              <img
                src="/slider-images/Ariana-mobilr"
                alt="Ariana"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
