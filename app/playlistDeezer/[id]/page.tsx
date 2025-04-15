import Information from "@/app/playlistDeezer/components/Information";
import Tracks from "@/app/playlistDeezer/components/Tracks";
import {
  getPlaylistInfoDeezerApi,
  getPlaylistTracks,
} from "@/action/getPlaylistFromDeezer";

interface PageProps {
  params: Promise<{ id: string }>;
}
export const revalidate = 0;
export const metadata = {
  title: " PlaylistDeezer Page",
};
export default async function PlaylistPage({ params }: PageProps) {
  const { id } = await params;
  const [artistInformation, playlistTracks] = await Promise.all([
    getPlaylistInfoDeezerApi(Number(id)),
    getPlaylistTracks(Number(id)),
  ]);
  console.log("artistinfo : ", artistInformation);
  console.log("playlistTracks : ", playlistTracks);
  return (
    <div className=" bg-white dark:bg-slate-800/30  w-full h-full overflow-hidden overflow-y-auto">
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information artistInformation={artistInformation} />
        <Tracks playlistTracks={playlistTracks} />
      </div>
    </div>
  );
}
