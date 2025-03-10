import Header from "../components/Header";
import BannerSlider from "./components/BannerSlider";
import ListOfGenre from "./components/ListOfGenre";
import PopularArtist from "./components/PopularArtist";
import TrendMusic from "./components/TrendMusic";
import {
  getPopularArtist,
  getTrendingTracks,
} from "@/action/getSongsFromDeezerApi";

export const revalidate = 0;

export default async function Home() {
  const songs = await getTrendingTracks(10);
  const artists = await getPopularArtist(10);
  console.log(songs);
  return (
    <main className=" bg-white dark:bg-slate-800/30  w-full  h-full overflow-hidden overflow-y-auto ">
      <Header />

      <div className=" px-1 md:px-4  mb-7 z-0">
        <BannerSlider />
        <ListOfGenre />
        <TrendMusic songs={songs} />
        <PopularArtist artists={artists} />
      </div>
    </main>
  );
}
