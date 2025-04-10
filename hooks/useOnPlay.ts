import { type Tracks } from "@/types";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";

export default function useOnPlay(songs: Tracks[], source: string) {
  const player = usePlayer();

  const onPlay = (id: number) => {
    player.setId(id, source);
    player.setIds(songs.map((song) => song.song_id));
  };
  return onPlay;
}
