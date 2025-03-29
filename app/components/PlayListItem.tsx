import { Playlist } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Playlist;
  onClick: (id: string) => void;
}
export default function PlaylistItem({ data, onClick }: MediaItemProps) {
  return (
    <div
      onClick={() => onClick(data.id)}
      className=" flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/050 w-full p-2 rounded-md  hover:bg-purple-200 dark:hover:bg-purple-600"
    >
      <div className=" relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        {" "}
        <Image
          src={data.image_url || "../../../public/Default-icon-music.png"}
          fill
          alt="Music"
          className=" object-cover"
        />
      </div>
      <div className=" flex flex-col gap-y-1 overflow-hidden">
        <p className="text-black dark:text-white truncate font-bold">
          {data.title}
        </p>
        <p className=" text-neutral-900 dark:text-white dark:opacity-70 text-sm truncate ">
          {data.description}
        </p>
      </div>
    </div>
  );
}
