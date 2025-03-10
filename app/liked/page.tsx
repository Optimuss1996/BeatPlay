import getSongsLiked from "@/action/getSongsLiked";
import Header from "../components/Header";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

export default async function Page() {
  const songs = await getSongsLiked();

  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header />
      <h1 className=" font-semibold text-3xl text-center">
        List of liked songs !
      </h1>

      <LikedContent songs={songs} />
    </div>
  );
}
