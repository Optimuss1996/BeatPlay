import { FaPlay } from "react-icons/fa";

export default function PlayButton() {
  return (
    <button className="rounded-full flex items-center justify-center bg-purple-600 p-3 hover:scale-110 transition">
      <FaPlay className="text-white" size={25} />
    </button>
  );
}
