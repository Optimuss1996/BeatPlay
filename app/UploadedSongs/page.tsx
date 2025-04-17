import Tracks from "./components/Tracks";
import getSongsUploaded from "@/action/getSongsUploaded";

export const revalidate = 0;
export const metadata = {
  title: " Uploaded Page",
};

interface PageProps {
  searchParams?: {
    page?: string;
  };
}

interface LikedProps {
  searchParams: { page?: string };
}

export default async function Page({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;
  const { data: songs, total } = await getSongsUploaded(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  console.log("uploaded  songs : ", songs);
  return (
    <div className=" bg-white dark:bg-slate-800/30 min-h-screen rounded-lg w-full h-full overflow-y-auto ">
      <div className=" flex justify-center">
        <h1 className=" font-ClashGrotesk p-3 mt-10  text-2xl lg:text-3xl xl:text-5xl bg-purple-500 rounded-md">
          List of Uploaded songs .
        </h1>
      </div>

      <Tracks songs={songs} totalPages={totalPages} />
    </div>
  );
}
