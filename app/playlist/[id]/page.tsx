import { getPlaylistById } from "@/action/getPlaylists";
import getTracksByPlaylistId from "@/action/getTracksByPlaylistId";
import Information from "../components/Information";
import Tracks from "../components/Tracks";

interface PageProps {
  params: Promise<{ id: string }>;
}
export const revalidate = 0;
export const metadata = {
  title: " Playlist Page",
};
export default async function PlaylistPage({ params }: PageProps) {
  const { id } = await params;
  const [playlist, playlistTrack] = await Promise.all([
    getPlaylistById(id),
    getTracksByPlaylistId(id),
  ]);

  // console.log("playlist : ", playlist, "playlistTrack :", playlistTrack);

  return (
    <div className=" bg-white dark:bg-slate-800/30  w-full h-full overflow-hidden overflow-y-auto">
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information playlistInfo={playlist} />
        <Tracks playlistTracks={playlistTrack} />
      </div>
    </div>
  );
}
