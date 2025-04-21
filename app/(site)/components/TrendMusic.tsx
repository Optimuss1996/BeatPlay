"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { type Tracks } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "@/app/components/PlayButton";
import Image from "next/image";

interface SongsProps {
  songs: Tracks[];
}

export default function TrendMusic({ songs }: SongsProps) {
  const onPlay = useOnPlay(songs, "deezer");

  return (
    <section className="w-full my-8 md:mb-10">
      <h2 className="font-bold text-start text-lg md:text-2xl px-4 mb-6">
        Trending Music
      </h2>

      <Swiper
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="px-4"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.song_id}>
            <div className="flex flex-col gap-2 group">
              <div
                className="relative w-full h-full cursor-pointer rounded-xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-95 bg-slate-200 dark:bg-slate-700"
                onClick={() => onPlay(song.song_id)}
                role="button"
                aria-label={`Play ${song.song_titleShort}`}
              >
                <Image
                  src={song.artist.picture_medium}
                  alt={song.song_titleShort || "Song cover"}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayButton />
                </div>
              </div>

              <div className="text-start">
                <p className="text-sm md:text-base font-semibold truncate w-36">
                  {song.song_titleShort}
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300 truncate">
                  {song.artist.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
