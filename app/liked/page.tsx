import getSongsLiked from "@/action/getSongsLiked";
import Header from "../components/Header";
import LikedContent from "./components/LikedContent";
import Footer from "../components/Footer";

export const revalidate = 0;

export default async function Page() {
  const songs = await getSongsLiked();
  console.log("liked songs : ", songs);
  return (
    <div className=" bg-white dark:bg-slate-800/30 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <div className=" flex justify-center">
        <h1 className=" font-ClashGrotesk p-3 mt-10  text-2xl lg:text-3xl xl:text-5xl bg-purple-500 rounded-md">
          List of liked songs !
        </h1>
      </div>

      <LikedContent songs={songs} />
    </div>
  );
}
