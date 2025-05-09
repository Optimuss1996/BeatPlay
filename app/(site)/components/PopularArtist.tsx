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
      <h2 className="font-bold text-start text-xl md:text-3xl px-4 mb-6">
        Popular Artists
      </h2>

      <Swiper
        loop
        spaceBetween={15}
        slidesPerView="auto"
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full px-4"
      >
        {artists.map((artist) => (
          <SwiperSlide
            key={artist.id}
            className="!w-40 sm:!w-44 md:!w-52 lg:!w-56 xl:!w-60"
          >
            <Link href={`/artist/${artist.id}`} className="group block">
              <div className="flex flex-col items-center gap-y-3">
                <div className="relative aspect-square w-full rounded-full overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform group-hover:scale-95">
                  <Image
                    src={artist.picture_medium}
                    alt={artist.name}
                    fill
                    className="object-cover bg-slate-200 dark:bg-slate-700"
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <p className="text-center text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 truncate w-full">
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
