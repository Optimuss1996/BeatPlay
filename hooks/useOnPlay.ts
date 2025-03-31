import { likedTracks, SongDezzer } from "@/types";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: SongDezzer[]) => {
  const { user } = useUser();
  // const authModal = useAuthModal();
  const player = usePlayer();

  const onPlay = (id: number) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    player.setId(id);
    if (player.ids.length === 0) {
      player.setIds(songs.map((song) => song.song_id)); // Only set once
    }
  };
  return onPlay;
};

export default useOnPlay;
