"use client";

import LikeButton from "@/app/liked/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { AlbumType, Artist, type Tracks } from "@/types";
import ArtistSearch from "@/app/search/components/ArtistSearch";
import AlbumsSearch from "./AlbumsSearch";
import TracksBySearch from "./TracksBySearch";
interface SearchContentProps {
  artists: Artist[];
  albums: AlbumType[];
  tracks: Tracks[];
}

export default function SearchContent({
  artists,
  albums,
  tracks,
}: SearchContentProps) {
  return (
    <div className=" flex flex-col gap-y-4 md:gap-y-6 px-6 w-full">
      <ArtistSearch artists={artists} />
      <AlbumsSearch albums={albums} />
      <TracksBySearch tracks={tracks} />
    </div>
  );
}
