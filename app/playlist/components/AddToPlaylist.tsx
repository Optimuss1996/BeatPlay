"use client";

import { useUser } from "@/hooks/useUser";
import { Playlist, Tracks } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

interface AddToPlaylistProps {
  track: Tracks;
}

export default function AddToPlaylist({ track }: AddToPlaylistProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    async function getPlaylists() {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", user.id) // Optional: filter to user's playlists
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching playlists:", error);
        toast.error("Error loading playlists.");
        return;
      }

      setPlaylists(data || []);
      setIsLoading(false);
    }

    getPlaylists();
  }, [user, supabaseClient]);

  async function addToPlaylist(playlistId: string) {
    if (!track || !track.song_id || isAdding) return;

    setIsAdding(true);

    const { data: existingSongs, error: checkError } = await supabaseClient
      .from("playlist_songs")
      .select("song_id")
      .eq("playlist_id", playlistId)
      .eq("song_id", track.song_id);

    if (checkError) {
      console.error("Error checking playlist:", checkError);
      toast.error("Error checking playlist.");
      setIsAdding(false);
      return;
    }

    if (existingSongs && existingSongs.length > 0) {
      toast.error("This song is already in the playlist!");
      setIsAdding(false);
      return;
    }

    const { error: insertError } = await supabaseClient
      .from("playlist_songs")
      .insert({
        user_id: track.user_id,
        playlist_id: playlistId,
        song_id: track.song_id,
        song_title: track.song_title,
        song_artist: track.song_artist,
        image_url: track.image_url,
        song_url: track.song_url,
        duration: track.duration,
      });

    setIsAdding(false);

    if (insertError) {
      console.error("Error adding song to playlist:", insertError);
      toast.error("Failed to add to playlist.");
      return;
    }

    toast.success("Added to playlist successfully!");
  }

  return (
    <DropdownMenu.Root>
      {/* Trigger button */}
      <DropdownMenu.Trigger asChild>
        <button
          className=" rounded-full border-none outline-none  hover:bg-gray-300 transition"
          disabled={isLoading}
        >
          <FaPlus className="text-gray-600 dark:text-gray-300" size={15} />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="end"
          sideOffset={5}
          className="w-40 lg:w-44 xl:w-48 bg-purple-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50"
        >
          <DropdownMenu.Item className="px-4 py-2 text-center font-semibold border-b border-gray-400 dark:border-gray-700">
            List of playlists
          </DropdownMenu.Item>

          {isLoading ? (
            <div className="flex justify-center py-3">
              <ScaleLoader height={20} width={3} color="#7c3aed" />
            </div>
          ) : playlists.length > 0 ? (
            playlists.map((playlist) => (
              <DropdownMenu.Item
                key={playlist.id}
                onClick={async () => await addToPlaylist(playlist.id)}
                disabled={isAdding}
                className={`px-4 py-2 cursor-pointer hover:bg-purple-300 dark:hover:bg-gray-700 transition  ${
                  isAdding ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="truncate max-w-40">{playlist.title}</div>
              </DropdownMenu.Item>
            ))
          ) : (
            <DropdownMenu.Item className="px-4 py-2 text-gray-400">
              No playlists found
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
