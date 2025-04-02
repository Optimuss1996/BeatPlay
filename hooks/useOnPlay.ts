import { type Tracks } from "@/types";
import { useUser } from "./useUser";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";

export default function useOnPlay(songs: Tracks[]) {
  const player = usePlayer();

  const onPlay = (id: number) => {
    player.setId(id);
    player.setIds(songs.map((song) => song.song_id));
  };
  return onPlay;
}
//
// //
// export function useOnPlayLikedSongs(songs: Tracks[]) {
//   const player = usePlayer();

//   const onPlay = (id: number) => {
//     player.setId(id);
//     player.setIds(songs.map((song) => song.song_id));
//   };
//   return onPlay;
// }
// export function useOnPlayPlaylistSongs(songs: Tracks[]) {
//   const player = usePlayer();

//   const onPlay = (id: number) => {
//     player.setId(id);
//     player.setIds(songs.map((song) => song.song_id));
//   };
//   return onPlay;
// }
