import {
  getAlbumBySearch,
  getArtistBySearch,
  getTracksBySearch,
} from "@/action/getSongBySearch";
import Header from "../components/Header";
import SearchContent from "./components/SearchContent";
import Footer from "../components/Footer";

interface SearchProps {
  searchParams: {
    title: string;
  };
}
export const revalidate = 0;

export default async function Page({ searchParams }: SearchProps) {
  const [artistBySearch, albumBySearch, tracksBySearch] = await Promise.all([
    getArtistBySearch(searchParams.title),
    getAlbumBySearch(searchParams.title),
    getTracksBySearch(searchParams.title, 20),
  ]);

  console.log(artistBySearch, albumBySearch, tracksBySearch);

  if (
    artistBySearch.length === 0 &&
    albumBySearch.length === 0 &&
    tracksBySearch.length === 0
  ) {
    return (
      <>
        <div className="  bg-white dark:bg-slate-800/30 w-full h-full ">
          <Header />
          <div className=" ">
            <h1 className="  font-ClashGrotesk px-6 text-black dark:text-white text-2xl md:text-3xl text-center mt-14">
              No Songs With this title :(
            </h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <SearchContent
        artists={artistBySearch}
        albums={albumBySearch}
        tracks={tracksBySearch}
      />
    </div>
  );
}
