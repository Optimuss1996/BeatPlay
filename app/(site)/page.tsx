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
    <main className="bg-white  w-full  h-full overflow-hidden overflow-y-auto rounded">
      <Header>
        <div className=" mb-2">
          <h1 className=" text-white text-3xl font-semibold  hidden">
            Welcome back
          </h1>
        </div>
      </Header>
      <div className=" px-4  mb-7 z-0">
        <BannerSlider />
        <ListOfGenre />
        <TrendMusic songs={songs} />
        <PopularArtist artists={artists} />
      </div>
    </main>
  );
}
