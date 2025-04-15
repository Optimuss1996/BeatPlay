import BannerSlider from "./components/BannerSlider";
import TrendPlaylist from "./components/TrendPlaylist";
import PopularArtist from "./components/PopularArtist";
import TrendMusic from "./components/TrendMusic";
import {
  getPopularArtist,
  getTrendingTracks,
} from "@/action/getSongsFromDeezerApi";
import { getTopPlaylistDeezerApi } from "@/action/getPlaylistFromDeezer";

export const revalidate = 0;

export default async function Home() {
  const [songs, artists, topPlaylist] = await Promise.all([
    getTrendingTracks(10),
    getPopularArtist(10),
    getTopPlaylistDeezerApi(),
  ]);
  // console.log("information artist : ", artists);
  return (
    <main className=" outline-8  bg-white dark:bg-slate-800/60  w-full overflow-x-hidden  overflow-y-auto">
      <div className=" px-1 md:px-4  mb-5 ">
        <BannerSlider />
        <TrendMusic songs={songs} />
        <TrendPlaylist topPlaylist={topPlaylist} />
        <PopularArtist artists={artists} />
      </div>
    </main>
  );
}
