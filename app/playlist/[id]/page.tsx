import { getPlaylistById } from "@/action/getPlaylists";
import getTracksByPlaylistId from "@/action/getTracksByPlaylistId";
import Information from "../components/Information";
import Tracks from "../components/Tracks";

interface PageProps {
  params?: { id: string };
  searchParams?: { page?: string };
}

export const revalidate = 0;
export const metadata = {
  title: "Playlist Page",
};

export default async function PlaylistPage({
  params,
  searchParams,
}: PageProps) {
  const id = params.id;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;

  const [playlist, { data: playlistTracks, total }] = await Promise.all([
    getPlaylistById(id),
    getTracksByPlaylistId(id, currentPage, limit),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white dark:bg-slate-800/30 w-full h-full overflow-hidden overflow-y-auto">
      <div className="flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information playlistInfo={playlist} />
        <Tracks playlistTracks={playlistTracks} totalPages={totalPages} />
      </div>
    </div>
  );
}
