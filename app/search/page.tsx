import {
  getAlbumBySearch,
  getArtistBySearch,
  getTracksBySearch,
} from "@/action/getSongBySearch";
import SearchContent from "./components/SearchContent";

// interface SearchProps {
//   searchParams: Promise<{ title: string }>;
// }
interface PageProps {
  searchParams?: {
    page?: string;
    title: string;
  };
}

export const revalidate = 0;
export const metadata = {
  title: " Search Page",
};
export default async function Page({ searchParams }: PageProps) {
  const { title } = searchParams;
  const currentPage = Number(searchParams?.page || 1);
  const limit = 10;
  const index = (currentPage - 1) * limit;
  const [artistBySearch, albumBySearch, { data: tracksBySearch, total }] =
    await Promise.all([
      getArtistBySearch(title),
      getAlbumBySearch(title),
      getTracksBySearch(title, limit, index),
    ]);
  const totalPages = Math.ceil(total / limit);

  // console.log(artistBySearch, albumBySearch, tracksBySearch);

  if (
    artistBySearch.length === 0 &&
    albumBySearch.length === 0 &&
    tracksBySearch.length === 0
  ) {
    return (
      <>
        <div className="  bg-white dark:bg-slate-800/30 w-full h-full ">
          <div className=" ">
            <h1 className="  font-ClashGrotesk px-6 text-black dark:text-white text-2xl md:text-3xl text-center mt-14">
              No Songs With this title :(
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=" bg-white dark:bg-slate-800/30  h-full w-full overflow-hidden overflow-y-auto">
      <SearchContent
        artists={artistBySearch}
        albums={albumBySearch}
        tracks={tracksBySearch}
        totalPages={totalPages}
      />
    </div>
  );
}
