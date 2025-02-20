"use client";

import MediaItem from "@/app/(site)/components/MediaItem";
import LikeButton from "@/app/components/LikeButton";
import { Song } from "@/types";

interface SearchContentProps {
  songs: Song[];
}

export default function SearchContent({ songs }: SearchContentProps) {
  if (songs.length === 0) {
    return (
      <div className=" flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Songs With this title
      </div>
    );
  }
  return (
    <div className=" flex flex-col gap-y-2 px-6 w-full">
      {songs.map((song) => (
        <div key={song.id} className=" flex items-center w-full gap-x-4">
          <div className=" flex-1">
            <MediaItem onClick={() => {}} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
