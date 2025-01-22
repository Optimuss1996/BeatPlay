import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

export default function Library() {
  function handleClick() {}

  return (
    <div className=" flex flex-col">
      <div className=" flex justify-between items-center px-5 pt-4">
        <div className=" inline-flex items-center gap-x-2 text-neutral-400 cursor-pointer">
          <TbPlaylist size={26} />
          <p>Your Library</p>
        </div>

        <AiOutlinePlus
          size={20}
          onClick={handleClick}
          className="text-neutral-400 hover:text-white transition cursor-pointer"
        />
      </div>
      <div className=" flex flex-col gap-y-2 mt-4 px-3">List of Songs!</div>
    </div>
  );
}
