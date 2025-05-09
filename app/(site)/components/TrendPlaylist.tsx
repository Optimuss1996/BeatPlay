"use client";

import { PlaylistDeezer } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface TrendPlaylistProps {
  topPlaylist: PlaylistDeezer[];
}
export default function TrendPlaylist({ topPlaylist }: TrendPlaylistProps) {
  return (
    <section className="w-full my-8 md:mb-10">
      <div className="font-bold text-start text-base sm:text-xl md:text-2xl px-4 mb-8 dark:text-white text-black">
        Top playlist
      </div>
      <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-6  gap-4 px-4">
        {topPlaylist.map((playlist) => (
          <Link href={`/playlistDeezer/${playlist.id}`} key={playlist.id}>
            <div
              key={playlist.id}
              className="relative group  rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 cursor-pointer shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-95"
            >
              <Image
                src={playlist.picture_big}
                alt={playlist.title}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-slate-200 text-sm font-semibold font-ClashGrotesk truncate w-24 text-center">
                  {playlist.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
