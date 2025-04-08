"use client";

import { Artist } from "@/types";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";
interface InformationProps {
  artistInfo: Artist;
}

export default function Information({ artistInfo }: InformationProps) {
  return (
    <section className=" flex flex-col w-full md:flex-row md:mt-32 mt-8">
      <div className=" flex-1 flex flex-col lg:flex-row md:ml-20 justify-center md:justify-start items-center md:gap-x-4 gap-y-4 ">
        <div className=" relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden">
          <Image
            src={artistInfo.picture_big}
            alt={artistInfo.name}
            fill
            className="object-cover rounded-full  "
          />
        </div>

        <div className=" flex justify-center items-center flex-col gap-y-3 ">
          <h1 className=" font-ClashGrotesk text-4xl sm:text-2xl lg:text-4xl text-black dark:text-white truncate max-w-96">
            {artistInfo.name}
          </h1>
          <div className=" flex flex-col items-center opacity-65 text-black dark:text-white">
            <p>{artistInfo.number_fan} fans</p>
            <p>{artistInfo.number_album} albums</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-11 md:mt-0 mt-4">
        <div className="flex flex-row md:flex-col gap-2 justify-center items-center cursor-pointer md:mr-5">
          <FaSquareXTwitter size={30} className=" text-black dark:text-white" />
          <FaInstagram size={30} className=" " />
          <FaYoutube size={30} className=" text-red-600" />
        </div>
      </div>
    </section>
  );
}
