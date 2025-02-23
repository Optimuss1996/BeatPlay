"use client";

import useGetSongById from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import useSongLoadUrl from "@/hooks/useSongLoadUrl";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const { activeId } = usePlayer();
  const { song } = useGetSongById(activeId);
  const songUrl = useSongLoadUrl(song!);

  if (!song || !activeId || !songUrl) {
    return null;
  }

  return (
    <div className=" w-full h-[80px] px-6 py-2 fixed bottom-0 bg-black">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
}
