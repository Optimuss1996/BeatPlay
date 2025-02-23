"use client";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

interface ListItemProps {
  name: string;
  href: string;
}

export default function ListItem({ name, href }: ListItemProps) {
  const router = useRouter();

  function handleRoute() {
    // Adding Authunticate before using this
    router.push(href);
  }

  return (
    <button
      onClick={handleRoute}
      className="
    relative 
    flex
    item-center
    gap-x-4
    group
    rounded-md
    overflow-hidden
  bg-neutral-100/10
  hover:bg-neutral-100/20
    transition
    pr-4
    "
    >
      <div
        className="
       relative
       min-h-[64px]
       min-w-[64px]
       bg-gradient-to-tr from-emerald-900 to-emerald-400
       flex justify-center items-center
       "
      >
        <HiHeart size={30} />
      </div>

      <p className="font-semibold truncate py-5">{name}</p>
      <div className=" flex  justify-center items-center absolute bg-green-500 rounded-full p-4 top-2 right-5 opacity-0 group-hover:opacity-100 hover:scale-110 drop-shadow-md transition">
        <FaPlay className=" text-black" />
      </div>
    </button>
  );
}
