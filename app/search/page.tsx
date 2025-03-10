import getSongByTitle from "@/action/getSongByTitle";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}
export const revalidate = 0;

export default async function Page({ searchParams }: SearchProps) {
  const songs = await getSongByTitle(searchParams.title);
  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header />
      <SearchInput />
      <SearchContent songs={songs} />
    </div>
  );
}
