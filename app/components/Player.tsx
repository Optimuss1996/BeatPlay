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
  const { song: uploadedSongs } = useGetUploadedSongById(activeId);

  const { song_Url } = useSongLoadUrl(activeId);
  let song: Tracks | null = null;
  if (!activeId || !activeSource) return null;

  if (activeSource === "deezer") {
    song = deezerSong ?? null;
  } else if (activeSource === "liked") {
    song = likedSong ?? null;
  } else if (activeSource === "playlist") {
    song = playlistSong ?? null;
  } else if (activeSource === "uploaded") {
    song = uploadedSongs ?? null;
  }

  let songUrl = activeSource === "uploaded" ? song?.song_url : song_Url;
  if (!song) return null;

  return (
    <div className="w-full h-[80px] px-2 py-3 fixed bottom-0 border-t border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={songUrl} songUrl={songUrl} song={song} />
    </div>
  );
}
