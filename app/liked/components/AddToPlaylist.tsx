"use client";

import { useUser } from "@/hooks/useUser";
import { likedTracks, Playlist, SongDezzer } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

interface AddToPlaylistProps {
  track: likedTracks;
}

export default function AddToPlaylist({ track }: AddToPlaylistProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isAdding, setIsAdding] = useState(false); // Prevent multiple clicks
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  // Fetch playlists from Supabase
  useEffect(() => {
    async function getPlaylists() {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching playlists:", error);
        return;
      }

      setPlaylists(data || []);
    }

    getPlaylists();
  }, []);

  async function addToPlaylist(playlistId: string) {
    if (!track || !track.song_id || isAdding) return; // Prevent multiple calls

    setIsAdding(true); // Block multiple clicks

    // 1️⃣ Check if the song is already in the playlist
    const { data: existingSongs, error: checkError } = await supabaseClient
      .from("playlist_songs")
      .select("song_id")
      .eq("playlist_id", playlistId)
      .eq("song_id", track.song_id);

    if (checkError) {
      console.error("Error checking playlist:", checkError);
      setIsAdding(false);
      return toast.error("Error checking playlist.");
    }

    if (existingSongs && existingSongs.length > 0) {
      setIsAdding(false);
      return toast.error("This song is already in the playlist!");
    }

    // 2️⃣ If not in playlist, insert song
    const { error: insertError } = await supabaseClient
      .from("playlist_songs")
      .insert({
        user_id: user?.id,
        playlist_id: playlistId,
        song_id: track.song_id,
        song_title: track.song_title,
        song_artist: track.song_artist,
        image_url: track.image_url,
        song_url: track.song_url,
        duration: track.duration,
      });

    setIsAdding(false); // Allow adding again

    if (insertError) {
      console.error("Error adding song to playlist:", insertError);
      return toast.error("Failed to add to playlist.");
    }

    toast.success("Added to playlist successfully!");
  }

  return (
    <DropdownMenu.Root>
      {/* Button to Trigger Dropdown */}
      <DropdownMenu.Trigger asChild>
        <button className="p-2 rounded-full border-none outline-none bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 transition">
          <FaPlus className="text-gray-600 dark:text-gray-300" />
        </button>
      </DropdownMenu.Trigger>

      {/* Dropdown Menu */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="end"
          sideOffset={5}
          className="w-40 lg:w-44 xl:w-48 bg-purple-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          <DropdownMenu.Item className="px-4 py-2 cursor-pointer hover:bg-purple-300 dark:hover:bg-gray-700 transition border-b-2 border-b-gray-500 border-opacity-60 text-center font-semibold">
            List of playlists
          </DropdownMenu.Item>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <DropdownMenu.Item
                key={playlist.id}
                onClick={() => addToPlaylist(playlist.id)}
                className="px-4 py-2 cursor-pointer hover:bg-purple-300 dark:hover:bg-gray-700 transition"
              >
                {playlist.title}
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
