"use client";

import { Tracks } from "@/types";
import PlayerContent from "./PlayerContent";
import usePlayer from "@/hooks/usePlayer";

import {
  useGetSongDeezerById,
  useGetLikedSongById,
  useGetPlaylistSongById,
} from "@/hooks/useGetSongById";
import { useSongLoadUrl } from "@/hooks/useSongLoadUrl";

export default function Player() {
  const { activeId, activeSource } = usePlayer();
  const { song: deezerSong } = useGetSongDeezerById(activeId);
  const { song: likedSong } = useGetLikedSongById(activeId);
  const { song: playlistSong } = useGetPlaylistSongById(activeId);
  const { songUrl } = useSongLoadUrl(activeId);
  let song: Tracks | null = null;
  if (!activeId || !activeSource) return null;

  if (activeSource === "deezer") {
    song = deezerSong ?? null;
  } else if (activeSource === "liked") {
    song = likedSong ?? null;
  } else if (activeSource === "playlist") {
    song = playlistSong ?? null;
  }
  if (!song) return null;
  console.log(`Player song from {${activeSource}} :`, song);
  console.log(`song url  {${activeSource}} :`, songUrl);

  return (
    <div className="w-full h-[80px] px-2 py-3 fixed bottom-0 border-t border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={songUrl} songUrl={songUrl} song={song} />
    </div>
  );
}
