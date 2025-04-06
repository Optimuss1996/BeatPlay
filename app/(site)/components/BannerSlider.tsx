"use client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

export default function BannerSlider() {
  return (
    <div className="w-full px-2 md:px-1 py-1 mx-auto z-0 mb-8 mt-4 md:mb-10 cursor-pointer">
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
          <Link href={"/artist/4050205"}>
            <div className=" relative w-full h-[300px] md:h-[350px]">
              <picture className=" relative">
                <source
                  srcSet="/slider-images/weekend-mobile.jpg"
                  media="(max-width: 950px)"
                />
                <img
                  src={"/slider-images/Weekend2400.jpg"}
                  alt="Weekend"
                  sizes="full"
                  className=" object-cover"
                />
              </picture>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/artist/12246"}>
            <div className=" relative w-full h-[300px] md:h-[350px]">
              <picture className=" relative">
                <source
                  srcSet="/slider-images/taylor-mobile.jpg"
                  media="(max-width: 950px)"
                />
                <img
                  src={"/slider-images/Taylor-lg.jpg"}
                  alt="Taylor"
                  sizes="full"
                  className=" object-cover"
                />
              </picture>
            </div>
          </Link>
        </SwiperSlide>

        <SwiperSlide>
          <Link href={"/artist/1562681"}>
            <div className=" relative w-full h-[300px] md:h-[350px]">
              <picture className=" relative">
                <source
                  srcSet="/slider-images/ariana-mobile.jpg"
                  media="(max-width: 950px)"
                />
                <img
                  src={"/slider-images/Ariana-lg.jpg"}
                  alt="Ariana"
                  sizes="full"
                  className=" object-cover"
                />
              </picture>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
