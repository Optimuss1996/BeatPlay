import { likedTracks, SongDezzer } from "@/types";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useState } from "react";

const useOnPlay = (songs: SongDezzer[]) => {
  const player = usePlayer();

  const onPlay = (id: number) => {
    player.setId(id);
    player.setIds(songs.map((song) => song.song_id)); // Only set once
  };
  return onPlay;
};

export default useOnPlay;
