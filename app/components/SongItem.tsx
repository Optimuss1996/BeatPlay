// "use client";

// import { SongDezzer } from "@/types";
// import { FaMusic, FaPlus } from "react-icons/fa";
// import { MdOutlineWatchLater } from "react-icons/md";
// import { formatDuration } from "@/utilities/commonFunction";
// import { AiOutlineHeart } from "react-icons/ai";
// import LikeButton from "@/app/liked/components/LikeButton";
// interface AlbumProps {
//   artistTopTracks: SongDezzer[];
// }

// export default function Tracks({ artistTopTracks }: AlbumProps) {
//   if (artistTopTracks.length === 0) {
//     return (
//       <div className="flex justify-center items-center px-3 py-2  text-black dark:text-white md:text-xl mt-32 md:mt-56  ">
//         Unfortunately, no music was found by this singer.
//       </div>
//     );
//   }

//   return (
//     <section className="mt-20 mb-72 w-full px-3 md:px-6 ">
//       <p className="w-5/6 text-start text-2xl md:text-3xl text-black dark:text-white font-semibold mb-8">
//         Top tracks
//       </p>
//       <main className=" w-11/12 mx-auto flex justify-between items-center px-5  border-b-2 border-b-gray-300 dark:border-b-gray-500 pb-3">
//         <div className=" flex-1 flex justify-start items-center gap-x-8 lg:gap-x-48 text-lg text-gray-700 dark:text-gray-400">
//           <p>Track</p>
//         </div>
//         <div className=" flex justify-end items-center  gap-x-8 lg:gap-x-12">
//           <MdOutlineWatchLater
//             size={25}
//             className=" text-black dark:text-white opacity-70"
//           />
//         </div>
//       </main>
//       <main className=" w-11/12 mx-auto flex flex-col gap-y-3    py-2 dark:border-b-gray-500 ">
//         {artistTopTracks.map((song) => (
//           <div
//             key={song.id}
//             className="w-full  flex justify-between items-center gap-x-3 px-3 py-3 cursor-pointer hover:bg-purple-200 dark:hover:bg-slate-800 transition  rounded-md"
//           >
//             <div className=" basis-2/3 flex justify-start items-center gap-x-4 md:gap-x-8  text-lg text-black dark:text-white">
//               <FaMusic size={20} className="text-purple-600 rounded-md" />
//               <p className=" md:text-sm text-xs font-semibold">
//                 {song.titleShort}
//               </p>
//             </div>

//             <div className="basis-1/3 flex justify-end items-center gap-x-2 md:gap-x-5 lg:gap-x-8">
//               <div className=" flex items-center justify-end gap-x-6">
//                 <FaPlus
//                   size={13}
//                   className=" text-gray-500 dark:text-gray-300  cursor-pointer "
//                 />
//                 <LikeButton track={song} />
//               </div>
//               <p className="w-11 text-center text-sm md:text-base">
//                 {formatDuration(song.duration)}
//               </p>
//             </div>
//           </div>
//         ))}
//       </main>
//     </section>
//   );
// }

// import useLoadImage from "@/hooks/useLoadImage";
// import { Song } from "@/types";
// import Image from "next/image";
// import PlayButton from "./PlayButton";

// interface SongItemPropsType {
//   data: Song;
//   onClick: (id: string) => void;
// }

// export default function SongItem({ data, onClick }: SongItemPropsType) {
//   const imagePath = useLoadImage(data);

//   return (
//     <div
//       onClick={() => onClick(data.id)}
//       className=" relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
//     >
//       <div className=" relative aspect-square w-full h-full rounded-md overflow-hidden">
//         <Image
//           className=" object-cover "
//           src={imagePath || "../../public/Default-icon-music.png"}
//           alt="Music"
//           fill
//         />
//       </div>
//       <div className=" flex flex-col items-start w-full pt-4 gap-y-1">
//         <p className=" font-semibold truncate w-full">{data.title}</p>

//         <p className="text-neutral-400 text-sm pb-4 truncate w-full">
//           {data.author}
//         </p>
//       </div>
//       <div className=" absolute bottom-24 right-5">
//         <PlayButton />
//       </div>
//     </div>
//   );
// }
