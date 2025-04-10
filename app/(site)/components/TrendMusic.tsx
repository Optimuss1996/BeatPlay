"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { type Tracks } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "@/app/components/PlayButton";

interface SongsProps {
  songs: Tracks[];
}

export default function TrendMusic({ songs }: SongsProps) {
  const onPlay = useOnPlay(songs, "deezer");

  return (
    <div className="w-full my-8 md:mb-10">
      <p className="font-bold text-start text-lg md:text-xl px-4 mb-8">
        Trending Musics
      </p>

      <Swiper
        slidesPerView={2}
        spaceBetween={5}
        loop={true}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          450: { slidesPerView: 2, spaceBetween: 5 },
          640: { slidesPerView: 3, spaceBetween: 5 },
          768: { slidesPerView: 3, spaceBetween: 5 },
          1024: { slidesPerView: 4, spaceBetween: 10 },
          1280: { slidesPerView: 5, spaceBetween: 10 },
        }}
        className="w-full"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.song_id}>
            <div className="flex flex-col gap-y-2 items-start justify-center group">
              <div
                className="relative w-40 md:w-36 xl:w-48 2xl:w-56 h-auto cursor-pointer transition-all duration-300 ease-in-out shadow-[0px_4px_14px_1px_rgba(17,_12,_46,_0.15)] group "
                onClick={() => onPlay(song.song_id)}
              >
                <img
                  src={song.artist.picture_medium}
                  alt={song.song_title}
                  className="w-full h-full rounded-lg hover:opacity-60"
                />

                {/* Play button on hover */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <PlayButton />
                </div>
              </div>

              <div className="pl-1 flex flex-col gap-y-1 text-start cursor-pointer">
                <p className="text-base truncate w-36 ">
                  {song.song_titleShort}
                </p>
                <p className="text-sm opacity-65 truncate">
                  {song.artist.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
