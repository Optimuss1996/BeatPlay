import { Song } from "@/types";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const player = usePlayer();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
