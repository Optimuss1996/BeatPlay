"use client";

import MediaItem from "@/app/(site)/components/MediaItem";
import LikeButton from "@/app/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { AlbumType, Artist, SongDezzer } from "@/types";
import ArtistSearch from "@/app/search/components/ArtistSearch";
import AlbumsSearch from "./AlbumsSearch";
import TracksBySearch from "./TracksBySearch";
interface SearchContentProps {
  artists: Artist[];
  albums: AlbumType[];
  tracks: SongDezzer[];
}

export default function SearchContent({
  artists,
  albums,
  tracks,
}: SearchContentProps) {
  // const onPlay = useOnPlay(songs);

  // if (songs.length === 0) {
  //   return (
  //     <div className=" flex flex-col gap-y-2 w-full px-6 text-neutral-400">
  //       No Songs With this title
  //     </div>
  //   );
  // }
  return (
    <div className=" flex flex-col gap-y-10 px-6 w-full">
      <ArtistSearch artists={artists} />
      <AlbumsSearch albums={albums} />
      <TracksBySearch tracks={tracks} />
    </div>
  );
}
