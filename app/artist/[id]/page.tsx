import {
  getArtistInformation,
  getArtistTopTracks,
  getArtistAlbums,
} from "@/action/getSongsFromDeezerApi";
import Box from "@/app/components/Box";
import Header from "@/app/components/Header";
import Information from "../components/Information";
import Album from "../components/Album";
import Tracks from "../components/Tracks";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
  const artistId = Number(params.id);

  const [artistInformation, artistAlbums, artistTopTracks] = await Promise.all([
    getArtistInformation(artistId),
    getArtistAlbums(artistId, 5),
    getArtistTopTracks(artistId, 20),
  ]);

  console.log(artistInformation);

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header />
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center"></div>
      <Information artistInfo={artistInformation} />
      <Album artistAlbums={artistAlbums} />
      <Tracks artistTopTracks={artistTopTracks} />
    </div>
  );
}
