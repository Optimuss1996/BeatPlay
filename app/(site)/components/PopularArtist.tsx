"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Artist, SongDezzer } from "@/types";
import { IoMdPlay } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
interface ArtistProp {
  artists: Artist[];
}

export default function PopularArtist({ artists }: ArtistProp) {
  return (
    <div className="w-full  my-8 md:mb-10">
      <p className=" font-bold text-start text-lg md:text-xl px-4 mb-8">
        Popular Artist
      </p>
      <Swiper
        slidesPerView={2} // Show 3 on small screens
        spaceBetween={15}
        loop={true}
        autoplay={{ delay: 3500 }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 10 }, // Tablets
          768: { slidesPerView: 3, spaceBetween: 10 }, // Small screens
          1024: { slidesPerView: 4, spaceBetween: 20 }, // Large screens
          1280: { slidesPerView: 4, spaceBetween: 30 }, // Extra large screens
        }}
        className="w-full"
      >
        {artists.map((artist) => (
          <SwiperSlide key={artist.id}>
            <Link href={`/artist/${artist.id}`}>
              <div className="flex flex-col gap-y-3 items-center justify-center ">
                <div className="w-32 xl:w-48 2xl:w-56 h-auto  flex justify-center items-center transition-all duration-300 ease-in-out  cursor-pointer  relative hover:opacity-60  group-hover:scale-105 ">
                  <img
                    src={artist.picture_medium}
                    alt={artist.name}
                    className="w-full h-full  rounded-full shadow-[0px_4px_14px_1px_rgba(17,_12,_46,_0.15)]"
                  />
                  <div className="flex justify-center items-center gap-x-1 absolute bottom-2 right-2  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <IoMdPlay
                      className="text-black bg-purple-800 p-2 rounded-full"
                      size={40}
                    />
                    <CiHeart
                      className="text-black bg-purple-800 p-2 rounded-full"
                      size={40}
                    />
                  </div>
                </div>
                <h1 className="text-center cursor-pointer md:text-lg font-semibold opacity-75">
                  {artist.name}
                </h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
