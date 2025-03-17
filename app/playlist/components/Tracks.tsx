"use client";

import { PlaylistTracks, SongDezzer } from "@/types";
import { FaMusic, FaPlus } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
interface playlistTracksProps {
  playlistTracks: PlaylistTracks[];
}

export default function Tracks({ playlistTracks }: playlistTracksProps) {
  if (playlistTracks.length === 0) {
    return (
      <div className="flex justify-center items-center px-3 py-2  text-black dark:text-white md:text-xl mt-32 md:mt-56  ">
        Unfortunately, no music was found by this singer.
      </div>
    );
  }

  return (
    <section className="mt-20 mb-72 w-full px-3 md:px-6 ">
      <p className="w-5/6 text-start text-2xl md:text-3xl text-black dark:text-white font-semibold mb-8">
        Tracks
      </p>
      <main className=" w-11/12 mx-auto flex justify-between items-center px-5  border-b-2 border-b-gray-300 dark:border-b-gray-500 pb-3">
        <div className=" flex-1 flex justify-start items-center gap-x-8 lg:gap-x-48 text-lg text-gray-700 dark:text-gray-400">
          <p>Track</p>
        </div>
        <div className=" flex justify-end items-center  gap-x-8 lg:gap-x-12">
          <MdOutlineWatchLater
            size={25}
            className=" text-black dark:text-white opacity-70"
          />
        </div>
      </main>
      <main className=" w-11/12 mx-auto flex flex-col gap-y-3    py-2 dark:border-b-gray-500 ">
        {playlistTracks.map((song) => (
          <div
            key={song.song_id}
            className="w-full  flex justify-between items-center gap-x-3 px-3 py-3 cursor-pointer hover:bg-purple-200 dark:hover:bg-slate-800 transition  rounded-md"
          >
            <div className=" basis-2/3 flex justify-start items-center gap-x-4 md:gap-x-8  text-lg text-black dark:text-white">
              <FaMusic size={20} className="text-purple-600 rounded-md" />
              <p className=" md:text-sm text-xs font-semibold">
                {song.song_title}
              </p>
            </div>

            <div className="basis-1/3 flex justify-end items-center gap-x-2 md:gap-x-5 lg:gap-x-8">
              <div className=" flex items-center justify-end gap-x-6">
                <FaPlus
                  size={13}
                  className=" text-gray-500 dark:text-gray-300  cursor-pointer "
                />
                <AiOutlineHeart
                  size={20}
                  className="text-purple-600 dark:text-white cursor-pointer"
                />
              </div>
              <p className="w-11 text-center text-sm md:text-base">02:45</p>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
