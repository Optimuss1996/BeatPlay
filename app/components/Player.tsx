"use client";

import { Tracks } from "@/types";
import PlayerContent from "./PlayerContent";
import usePlayer from "@/hooks/usePlayer";

import {
  useGetSongDeezerById,
  useGetLikedSongById,
  useGetPlaylistSongById,
  useGetUploadedSongById,
} from "@/hooks/useGetSongById";
import { useSongLoadUrl } from "@/hooks/useSongLoadUrl";

export default function Player() {
  const { activeId, activeSource } = usePlayer();

  const { song: deezerSong } = useGetSongDeezerById(activeId);
  const { song: likedSong } = useGetLikedSongById(activeId);
  const { song: playlistSong } = useGetPlaylistSongById(activeId);
  const { song: uploadedSong } = useGetUploadedSongById(activeId);
  const { song_Url } = useSongLoadUrl(activeId);

  if (!activeId || !activeSource) return null;

  let song: Tracks | null = null;
  let songUrl: string | undefined;

  if (activeSource === "deezer") {
    song = deezerSong ?? null;
    songUrl = song_Url;
  } else if (activeSource === "liked") {
    song = likedSong ?? null;
    songUrl = song_Url;
  } else if (activeSource === "playlist") {
    song = playlistSong ?? null;
    songUrl = song_Url;
  } else if (activeSource === "uploaded") {
    song = uploadedSong ?? null;
    songUrl = song?.song_url;
  }

  if (!song) return null;
  console.log(`song from ${activeSource}`, song);
  console.log(`songUrl from ${activeSource}`, songUrl);

  return (
    <div className="w-full h-[80px] px-2 py-3 fixed bottom-0 border-t border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={songUrl} songUrl={songUrl} song={song} />
    </div>
  );
}
