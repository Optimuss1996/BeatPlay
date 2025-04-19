import Information from "@/app/playlistDeezer/components/Information";
import Tracks from "@/app/playlistDeezer/components/Tracks";
import {
  getPlaylistInfoDeezerApi,
  getPlaylistTracks,
} from "@/action/getPlaylistFromDeezer";

interface PageProps {
  params?: { id: string };
  searchParams?: {
    page?: string;
  };
}

export const revalidate = 0;
export const metadata = {
  title: " PlaylistDeezer Page",
};
export default async function PlaylistPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = params;
  const currentPage = Number(searchParams?.page || 1);
  const limit = 10;
  const index = (currentPage - 1) * limit;
  const [artistInformation, { data: playlistTracks, total }] =
    await Promise.all([
      getPlaylistInfoDeezerApi(Number(id)),
      getPlaylistTracks(Number(id), limit, index),
    ]);

  const totalPages = Math.ceil(total / limit);
  // console.log("artistinfo : ", artistInformation);
  // console.log("playlistTracks : ", playlistTracks);
  return (
    <div className=" bg-white dark:bg-slate-800/30  w-full h-full overflow-hidden  overflow-y-auto">
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information artistInformation={artistInformation} />
        <Tracks playlistTracks={playlistTracks} totalPages={totalPages} />
      </div>
    </div>
  );
}
