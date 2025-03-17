"use client";

import { useState } from "react";
import { Playlist } from "@/types";
import { FaChevronDown } from "react-icons/fa";
import { usePlaylistIdStore } from "@/hooks/usePlaylistId";

interface CustomSelectProps {
  playlists: Playlist[];
  isLoading: boolean; // Pass loading state
}

export default function CustomSelect({
  playlists,
  isLoading,
}: CustomSelectProps) {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const usePlaylistId = usePlaylistIdStore();

  return (
    <div className="relative w-full">
      {/* Button to Open Select */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center w-full bg-purple-300
               dark:bg-slate-800/60 text-black dark:text-gray-400 py-3 px-5 rounded-md transition ${
                 selected && "text-gray-800"
               } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {selected ? selected : "Where do you upload?"}
        <FaChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown Options */}
      {open && !isLoading && (
        <div className="absolute left-0 -mt-[170px] h-auto max-h-40 overflow-y-auto w-full bg-purple-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
          <ul className="py-2">
            {/* Liked Songs (Fixed Option) */}
            <li
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                selected === "Liked Songs"
                  ? "font-semibold text-purple-600"
                  : ""
              }`}
              onClick={() => {
                setSelected("Liked Songs");
                usePlaylistId.setId("liked_songs");
                setOpen(false);
              }}
            >
              Liked Songs
            </li>

            {/* Separator */}
            <hr className="border-gray-300 dark:border-gray-600 my-1" />

            {/* Dynamic Playlist Options */}
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <li
                  key={playlist.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
                    selected === playlist.title
                      ? "font-semibold text-purple-500"
                      : ""
                  }`}
                  onClick={() => {
                    setSelected(playlist.title);
                    usePlaylistId.setId(playlist.id);
                    setOpen(false);
                  }}
                >
                  {playlist.title}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400 dark:text-gray-500">
                No playlists found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
