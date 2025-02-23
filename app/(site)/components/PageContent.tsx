"use client";

import SongItem from "@/app/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
  songs: Song[];
}
export default function PageContent({ songs }: PageContentProps) {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className=" mt-4 text-neutral-400 ">No Songs Available.</div>;
  }

  return (
    <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  2xl:grid-cols-8 ">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => {
            onPlay(id);
          }}
          data={song}
        />
      ))}
    </div>
  );
}
