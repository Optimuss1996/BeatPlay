"use client";

import { Playlist } from "@/types";
import Image from "next/image";
interface InformationProps {
  playlistInfo: Playlist;
}

export default function Information({ playlistInfo }: InformationProps) {
  return (
    <section className=" flex flex-col w-full  md:mt-32 mt-8">
      <div className=" flex-1 flex flex-col md:ml-20 justify-center md:justify-start items-center md:gap-x-4 gap-y-4 ">
        <div className=" relative w-56 h-56 md:w-72 md:h-72 rounded-md overflow-hidden">
          <Image
            src={playlistInfo.image_url}
            alt={playlistInfo.title}
            fill
            className="object-cover rounded-md  "
          />
        </div>

        <div className=" flex justify-center items-center flex-col gap-y-3 ">
          <h1 className=" font-ClashGrotesk text-4xl sm:text-2xl lg:text-5xl text-black dark:text-white truncate max-w-72 md:max-w-96">
            {playlistInfo.title}
          </h1>
          <p className="truncate max-w-72 md:max-w-96">
            {playlistInfo.description} fans
          </p>
        </div>
      </div>
    </section>
  );
}
