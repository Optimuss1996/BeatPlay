"use client";

import { TbPlaylist } from "react-icons/tb";
import { LuUpload } from "react-icons/lu";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Playlist } from "@/types";
import { HiHeart, HiOutlinePlusSm } from "react-icons/hi";
import { useRouter } from "next/navigation";
import usePlayListModal from "@/hooks/usePlayListModal";
import PlaylistItem from "./PlayListItem";
import Link from "next/link";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";
import { FaUser } from "react-icons/fa";
//
interface PropsLibrary {
  playlists: Playlist[];
}
//
export default function Library({ playlists }: PropsLibrary) {
  const { user } = useUser();
  const authModal = useAuthModal();
  const playlistModal = usePlayListModal();
  const isOpenSidebar = useIsOpenSidebar();

  const uploadModal = useUploadModal();
  const route = useRouter();

  function handleClickLiked() {
    if (!user) {
      return authModal.onOpen();
    }
    return route.push("/liked");
  }
  function handleClickUploaded() {
    if (!user) {
      return authModal.onOpen();
    }
    return route.push("/UploadedSongs");
  }

  function handleOpenModal() {
    playlistModal.onOpen();
    isOpenSidebar.onClose();
  }
  return (
    <div className=" flex flex-col overflow-x-hidden">
      <div className=" flex justify-between items-center px-5 pt-4">
        <div className="inline-flex items-center justify-center gap-x-2 text-black dark:text-white">
          <TbPlaylist size={26} />

          <p>Your Library</p>
        </div>

        <div className="relative  group w-fit">
          <LuUpload
            size={18}
            onClick={uploadModal.onOpen}
            className="text-black dark:text-white hover:opacity-60 rounded-md transition cursor-pointer"
          />
          <div className="absolute left-0 -translate-x-1/2 top-full mt-1 w-max px-2 py-1 text-xs text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition duration-500">
            Upload Song
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 mt-4 px-3">
        <div
          onClick={handleClickLiked}
          className=" flex justify-start gap-x-3 items-center rounded-md hover:bg-purple-200 dark:hover:bg-purple-600 p-2 cursor-pointer "
        >
          <HiHeart
            size={45}
            className="text-red-500 bg-red-200 p-2 rounded-md "
          />
          <p className="font-medium text-sm md:text-lg">Liked Songs</p>
        </div>

        <div
          onClick={handleClickUploaded}
          className=" flex justify-start gap-x-3 items-center rounded-md hover:bg-purple-200 dark:hover:bg-purple-600 p-2 cursor-pointer "
        >
          <FaUser
            size={45}
            className="text-blue-500 bg-blue-200 p-2 rounded-md "
          />
          <p className="font-medium text-sm md:text-lg">uploaded Songs</p>
        </div>

        <div
          onClick={handleOpenModal}
          className="flex justify-start gap-x-3 items-center rounded-md hover:bg-purple-200 dark:hover:bg-purple-600 p-2 cursor-pointer "
        >
          <HiOutlinePlusSm size={35} className="opacity-35 dark:opacity-80" />
          <p className="font-medium opacity-35 dark:opacity-80 text-lg">
            Create Playlist
          </p>
        </div>

        <div className=" flex flex-col gap-y-1">
          {playlists.map((playlist) => (
            <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
              <PlaylistItem data={playlist} onClick={isOpenSidebar.onClose} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
