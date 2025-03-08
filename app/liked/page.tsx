import getSongsLiked from "@/action/getSongsLiked";
import Header from "../components/Header";
import { HiHeart } from "react-icons/hi";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

export default async function Page() {
  const songs = await getSongsLiked();

  return (
    <div className=" bg-white rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className=" mt-20">
          <div className=" flex flex-col md:flex-row  items-center gap-x-6">
            <div className=" ">
              <HiHeart
                size={100}
                className="text-red-500 bg-red-200 p-2 rounded-md "
              />
            </div>
            <div className=" flex flex-col  gap-y-2 mt-4 md:mt-0">
              <h1 className=" font-bold text-purple-700 bg-purple-200 rounded-md text-2xl sm:text-3xl lg:text-4xl px-3 py-2">
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
