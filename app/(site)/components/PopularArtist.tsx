"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Artist } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ArtistProp {
  artists: Artist[];
}

export default function PopularArtist({ artists }: ArtistProp) {
  return (
    <section className="w-full my-8 md:mb-12 overflow-hidden">
      <h2 className="font-bold text-start text-lg md:text-2xl px-4 mb-6">
        🌟 Popular Artists
      </h2>

      <Swiper
        loop
        spaceBetween={15}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full px-4"
      >
        {artists.map((artist) => (
          <SwiperSlide key={artist.id} className="w-full">
            <Link href={`/artist/${artist.id}`} className="group">
              <div className="flex flex-col items-center gap-y-3">
                {/* Image Container */}
                <div className="relative w-24 sm:w-32 md:w-40 xl:w-48 2xl:w-56 aspect-square rounded-full overflow-hidden shadow-md ">
                  <Image
                    src={artist.picture_medium}
                    alt={artist.name}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>

                {/* Artist Name */}
                <p className="text-center text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 truncate w-32 sm:w-36">
                  {artist.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
