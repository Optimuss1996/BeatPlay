import BannerSlider from "./components/BannerSlider";
import ListOfGenre from "./components/ListOfGenre";
import PopularArtist from "./components/PopularArtist";
import TrendMusic from "./components/TrendMusic";
import {
  getPopularArtist,
  getTracksByGenre,
  getTrendingTracks,
} from "@/action/getSongsFromDeezerApi";

export const revalidate = 0;

export default async function Home() {
  const [songs, artists, tracksByGenre] = await Promise.all([
    getTrendingTracks(10),
    getPopularArtist(10),
    getTracksByGenre(10),
  ]);

  return (
    <main className=" outline-8  bg-white dark:bg-slate-800/60  w-full overflow-x-hidden  overflow-y-auto">
      <div className=" px-1 md:px-4  mb-5 ">
        <BannerSlider />
        <ListOfGenre />
        <TrendMusic songs={songs} />
        <PopularArtist artists={artists} />
      </div>
    </main>
  );
}
