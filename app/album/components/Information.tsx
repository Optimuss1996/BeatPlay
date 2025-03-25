"use client";

import { AlbumType } from "@/types";
import Image from "next/image";
interface InformationProps {
  albumInfo: AlbumType;
}

export default function Information({ albumInfo }: InformationProps) {
  return (
    <section className=" flex flex-col w-full  md:mt-32 mt-8">
      <div className=" flex-1 flex flex-col md:ml-20 justify-center md:justify-start items-center md:gap-x-4 gap-y-4 ">
        <div className=" relative w-56 h-56 md:w-72 md:h-72 rounded-md overflow-hidden">
          <Image
            src={albumInfo.cover_big}
            alt={albumInfo.title}
            fill
            className="object-cover rounded-md  "
          />
        </div>

        <div className=" flex justify-center items-center flex-col gap-y-3 ">
          <h1 className=" font-ClashGrotesk text-4xl sm:text-2xl lg:text-6xl text-black dark:text-white">
            {albumInfo.title}
          </h1>
          <p className="text-lg font-semibold">{albumInfo.artist?.name} </p>
          <div className=" flex justify-center items-center gap-x-2 opacity-75 p-1">
            <p className=" border-r border-gray-500 px-1">
              {albumInfo.fans} fans
            </p>
            <p className=" border-r border-gray-500 pr-1">
              {albumInfo.nb_tracks} tracks
            </p>
            <p className="  px-1">{albumInfo.release_date} </p>
          </div>
        </div>
      </div>
    </section>
  );
}
