"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { PiMicrophoneStageLight, PiMicrophone } from "react-icons/pi";
import { GiGuitar } from "react-icons/gi";
import { IoMdHappy, IoMdPlay } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";
import { LuKeyboardMusic, LuHandMetal } from "react-icons/lu";
import { LiaGuitarSolid } from "react-icons/lia";
import { SlGameController } from "react-icons/sl";

import { useState } from "react";
import useOnPlay from "@/hooks/useOnPlay";
import useGenreTracks from "@/hooks/useGenreTracks";
import Image from "next/image";

// Genre Data with Unique Pastel Colors
const genre = [
  {
    name: "Pop",
    id: 132,
    icon: PiMicrophoneStageLight,
    color: "text-pink-400",
    bgOnHover: "bg-gradient-to-r from-pink-700 to-amber-500",
  },
  {
    name: "Rap/Hip Hop",
    id: 116,
    icon: PiMicrophone,
    color: "text-blue-400",
    bgOnHover: "bg-gradient-to-r from-cyan-500 to-cyan-800",
  },
  {
    name: "Rock",
    id: 152,
    icon: GiGuitar,
    color: "text-red-400",
    bgOnHover: "bg-gradient-to-r from-red-500 to-red-900",
  },
  {
    name: "Dance",
    id: 113,
    icon: IoMdHappy,
    color: "text-yellow-400",
    bgOnHover: "bg-gradient-to-r from-yellow-400 to-yellow-800",
  },
  {
    name: "Electro",
    id: 106,
    icon: MdElectricBolt,
    color: "text-green-400",
    bgOnHover: "bg-gradient-to-r from-green-500 to-green-900",
  },
  {
    name: "Jazz",
    id: 129,
    icon: LuKeyboardMusic,
    color: "text-purple-400",
    bgOnHover: "bg-gradient-to-r from-fuchsia-400 to-fuchsia-900",
  },
  {
    name: "Country",
    id: 84,
    icon: LiaGuitarSolid,
    color: "text-orange-400",
    bgOnHover: "bg-gradient-to-r from-orange-400 to-orange-900",
  },
  {
    name: "Films/Games",
    id: 173,
    icon: SlGameController,
    color: "text-green-400",
    bgOnHover: "bg-gradient-to-r from-emerald-400 to-green-900",
  },
  {
    name: "Metal",
    id: 464,
    icon: LuHandMetal,
    color: "text-indigo-400",
    bgOnHover: "bg-gradient-to-r from-cyan-600 to-teal-900",
  },
];

export default function ListOfGenre() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const { tracks, loading, error } = useGenreTracks(selectedGenreId ?? 0);
  // const onPlay = useOnPlay(tracks);

  return (
    <div className="w-full my-8 md:mb-10">
      <p className="font-bold text-start text-base sm:text-lg md:text-xl px-4 mb-8 dark:text-white text-black">
        Songs based on your mood
      </p>

      {/* Genre Selector */}
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 5, spaceBetween: 10 },
          768: { slidesPerView: 4, spaceBetween: 10 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
          1280: { slidesPerView: 8, spaceBetween: 30 },
        }}
        className="w-full"
      >
        {genre.map(({ id, name, icon: Icon, color, bgOnHover }) => (
          <SwiperSlide key={id} className="flex justify-center items-center">
            <div
              onClick={() => setSelectedGenreId(id)}
              className="flex flex-col gap-y-2 items-center justify-center"
            >
              <div
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`w-20 h-20 md:w-28 md:h-28 rounded-full flex justify-center items-center transition duration-300 ease-in-out cursor-pointer ${
                  hoveredId === id
                    ? bgOnHover
                    : "bg-purple-100 dark:bg-slate-800/80"
                }`}
              >
                {hoveredId === id ? (
                  <IoMdPlay
                    size={30}
                    className="text-black bg-white rounded-full p-[6px] transition"
                  />
                ) : (
                  <Icon size={50} className={`text-4xl ${color}`} />
                )}
              </div>
              <span className="text-sm">{name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Track Results */}
      {loading ? (
        <p className="text-center mt-6">Loading tracks...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : tracks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-10 px-4">
          {tracks.map((track) => (
            <div
              key={track.song_id}
              className="group cursor-pointer relative"
              // onClick={() => onPlay(track.song_id)}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                <Image
                  src={track.album?.cover ?? ""}
                  alt={track.song_title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <IoMdPlay className="text-white text-3xl" />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold truncate">
                  {track.song_title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {track.artist?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        selectedGenreId && (
          <p className="text-center mt-6 text-muted-foreground">
            No tracks found.
          </p>
        )
      )}
    </div>
  );
}
