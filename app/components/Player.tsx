"use client";

import { useGetSongDeezerById } from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

export default function Player() {
  const { activeId, activeSource } = usePlayer();

  const { song } = useGetSongDeezerById(activeId);

  if (!song || !activeId) {
    return null;
  }

  return (
    <div className="w-full h-[80px] px-6 py-3 fixed bottom-0 border-t border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
      <PlayerContent key={song.song_id} song={song} />
    </div>
  );
}
//
//
//
//
// "use client";

// import { useGetSongDeezerById } from "@/hooks/useGetSongById";
// import { useGetLikedSongById } from "@/hooks/useGetSongById";
// import { useGetPlaylistSongById } from "@/hooks/useGetSongById";
// import usePlayer from "@/hooks/usePlayer";
// import PlayerContent from "./PlayerContent";
// import { Tracks } from "@/types";

// export default function Player() {
//   const { activeId, activeSource } = usePlayer();

//   // Call all hooks unconditionally
//   const { song: deezerSong } = useGetSongDeezerById(activeId);
//   const { song: likedSong } = useGetLikedSongById(activeId);
//   const { song: playlistSong } = useGetPlaylistSongById(activeId);

//   // Choose the song based on activeSource
//   let song: Tracks;

//   if (activeSource === "deezer") {
//     song = deezerSong;
//   } else if (activeSource === "liked") {
//     song = likedSong;
//   } else if (activeSource === "playlist") {
//     song = playlistSong;
//   }

//   if (!song || !activeId) {
//     return null;
//   }

//   return (
//     <div className="w-full h-[80px] px-6 py-3 fixed bottom-0 border-t border-gray-400 border-opacity-75 bg-purple-200 shadow-lg dark:bg-slate-900 z-50">
//       <PlayerContent key={song.song_id} song={song} />
//     </div>
//   );
// }
