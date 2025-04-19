import {
  getArtistInformation,
  getArtistTopTracks,
  getArtistAlbums,
} from "@/action/getSongsFromDeezerApi";
import Information from "../components/Information";
import Album from "../components/Album";
import Tracks from "../components/Tracks";

export const revalidate = 0;
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const artistId = id;

  const [artistInformation, artistAlbums, artistTopTracks] = await Promise.all([
    getArtistInformation(artistId),
    getArtistAlbums(artistId, 5),
    getArtistTopTracks(artistId, 15),
  ]);

  // console.log(artistInformation);
  // console.log("tracks add to playlist : ", artistTopTracks);

  return (
    <div className=" bg-white dark:bg-slate-800/30  w-full h-full overflow-hidden overflow-y-auto">
      <Information artistInfo={artistInformation} />
      <Album artistAlbums={artistAlbums} />
      <Tracks artistTopTracks={artistTopTracks} />
    </div>
  );
}
