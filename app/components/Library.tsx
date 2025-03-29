import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Playlist } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import { HiHeart, HiOutlinePlusSm } from "react-icons/hi";
import { useRouter } from "next/navigation";
import usePlayListModal from "@/hooks/usePlayListModal";
import Link from "next/link";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";
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
  // const onPlay = useOnPlay(songs);

  function handleClick() {
    if (!user) {
      return authModal.onOpen();
    }
    return route.push("/liked");
  }

  function handleOpenModal() {
    playlistModal.onOpen();
    isOpenSidebar.onClose();
  }
  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between items-center px-5 pt-4">
        <div className="sticky top-0">
          <div className="inline-flex items-center gap-x-2 text-black dark:text-white cursor-pointer">
            <TbPlaylist size={26} />
            <p>Your Library</p>
          </div>
        </div>

        <AiOutlinePlus
          size={20}
          onClick={uploadModal.onOpen}
          className="text-black dark:text-white  rounded-md transition cursor-pointer"
        />
      </div>
      <div className=" flex flex-col gap-y-2 mt-4 px-3">
        <div
          onClick={handleClick}
          className=" flex justify-start gap-x-3 items-center rounded-md hover:bg-purple-200 dark:hover:bg-purple-600 p-2 cursor-pointer "
        >
          <HiHeart
            size={45}
            className="text-red-500 bg-red-200 p-2 rounded-md "
          />
          <p className="font-medium text-lg">Liked Songs</p>
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
