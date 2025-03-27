"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const { activeId } = usePlayer();
  const { song } = useGetSongById(String(activeId));

  if (!song || !activeId) {
    return null;
  }

  return (
    <div className=" w-full h-[80px] px-6 py-2 fixed bottom-0 border-t-2  border-gray-300 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={song.song_url} song={song} />
    </div>
  );
}
