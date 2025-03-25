import Header from "@/app/components/Header";
import Information from "../components/Information";
import Tracks from "../components/Tracks";
import {
  getAlbumDezzerApi,
  getAlbumTracksDezzerApi,
} from "@/action/getAlbumDezzerApi";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const numberId = Number(params.id);
  const [albumInfo, albumTracks] = await Promise.all([
    getAlbumDezzerApi(numberId),
    getAlbumTracksDezzerApi(numberId),
  ]);

  console.log("albumInfo : ", albumInfo, "albumTracks :", albumTracks);

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header />
      <div className=" flex flex-col gap-x-12 md:gap-x-28 justify-center items-center">
        <Information albumInfo={albumInfo} />
        <Tracks albumTracks={albumTracks} />
      </div>
    </div>
  );
}
