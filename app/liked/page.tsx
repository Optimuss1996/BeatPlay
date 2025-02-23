import getSongsLiked from "@/action/getSongsLiked";
import Header from "../components/Header";
import { HiHeart } from "react-icons/hi";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

export default async function Page() {
  const songs = await getSongsLiked();

  return (
    <div className=" bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className=" mt-20">
          <div className=" flex flex-col md:flex-row  items-center gap-x-6">
            <div
              className=" relative flex justify-center items-center w-32 h-32 lg:h-44 lg:w-44        bg-gradient-to-tr from-emerald-900 to-emerald-400
               rounded-md"
            >
              <HiHeart className=" w-20 h-20  " />
            </div>
            <div className=" flex flex-col  gap-y-2 mt-4 md:mt-0">
              <p className=" font-semibold text-sm  hidden md:block">
                PlayList
              </p>
              <h1 className=" font-bold text-white text-4xl sm:text-5xl lg:text-7xl ">
                LikedSong!
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  );
}
