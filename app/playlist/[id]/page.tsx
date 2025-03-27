import { getPlaylistById } from "@/action/getPlaylists";
import getTracksByPlaylistId from "@/action/getTracksByPlaylistId";
import Header from "@/app/components/Header";
import Information from "../components/Information";
import Tracks from "../components/Tracks";
import Footer from "@/app/components/Footer";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const [playlist, playlistTrack] = await Promise.all([
    getPlaylistById(params.id),
    getTracksByPlaylistId(params.id),
  ]);

  console.log("playlist : ", playlist, "playlistTrack :", playlistTrack);

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information playlistInfo={playlist} />
        <Tracks playlistTracks={playlistTrack} />
      </div>
    </div>
  );
}
