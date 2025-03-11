import { SongDezzer } from "@/types";

interface AlbumProps {
  artistTopTracks: SongDezzer[];
}

export default function Tracks({ artistTopTracks }: AlbumProps) {
  return <div>Tracks</div>;
}
