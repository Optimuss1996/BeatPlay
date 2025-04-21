import { type Tracks } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import usePlayer from "./usePlayer";
import { useParams } from "next/navigation";

export const useGetPlaylistSongById = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const player = usePlayer();
  const params = useParams(); // 👈
  const playlistId = params?.id as string;
  useEffect(() => {
    if (!id || !user?.id || player.activeSource !== "playlist") {
      return;
    }
    setIsLoading(true);
    async function getSong() {
      const { data, error } = await supabaseClient
        .from("playlist_songs")
        .select("*")
        .eq("song_id", id)
        .eq("user_id", user?.id)
        .eq("playlist_id", playlistId)
        .maybeSingle();
      if (error) {
        toast.error(`Error from getPlaylist tracks by Id ${error.message}`);
        console.error(`Error from getPlaylist tracks by Id ${error.message}`);
        setIsLoading(false);
      }
      setSong(data);
      setIsLoading(false);
      // console.log("playlist Song", data);
    }

    getSong();
  }, [id, supabaseClient]);

  return { song, isLoading };
};
export const useGetLikedSongById = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const player = usePlayer();
  useEffect(() => {
    if (!id || !user?.id || player.activeSource !== "liked") {
      return;
    }
    setIsLoading(true);
    async function getSong() {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", id)
        .eq("user_id", user?.id)
        .maybeSingle();

      if (error) {
        toast.error(`Error from getLiked tracks by Id ${error.message}`);
        console.error(`Error from getLiked tracks by Id ${error.message}`);
        setIsLoading(false);
      }

      setSong(data);
      setIsLoading(false);
    }

    getSong();
  }, [id, supabaseClient]);

  return { song, isLoading };
};
//
//
//
//
export const useGetUploadedSongById = (id: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  const player = usePlayer();
  const { user } = useUser();
  useEffect(() => {
    if (!id || !user?.id || player.activeSource !== "uploaded") {
      return;
    }
    setIsLoading(true);
    async function getSong() {
      const { data, error } = await supabaseClient
        .from("uploaded_songs")
        .select("*")
        .eq("song_id", id)
        .eq("user_id", user?.id)
        .maybeSingle();
      if (error) {
        toast.error(
          `Error from get uploaded songs tracks by Id ${error.message}`
        );
        console.error(
          `Error from get uploaded songs tracks by Id ${error.message}`
        );
        setIsLoading(false);
      }
      setSong(data);
      setIsLoading(false);
      // console.log("playlist Song", data);
    }

    getSong();
  }, [id, supabaseClient]);

  return { song, isLoading };
};
//
//
//
//
//
export function useGetSongDeezerById(id: number) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | null>(null);
  const player = usePlayer();
  useEffect(() => {
    if (!id || player.activeSource !== "deezer") return;

    async function getTrack() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/getDeezerTrack?id=${id}`);

        if (!res.ok) {
          console.warn(
            `Error Fetching from deezer by ID  : ${res.status} ${res.statusText}`
          );
          return null;
        }

        const data = await res.json();

        if (data.error) {
          console.warn(
            `Error Fetching from deezer by ID : ${data.error.message}`
          );
          toast.error(
            `Error Fetching from deezer by ID  : ${data.error.message}`
          );
          return;
        }

        setSong({
          song_id: data.id,
          song_title: data.title,
          song_titleShort: data.title_short,
          song_url: data.preview,
          duration: data.duration,
          artist: data.artist
            ? {
                name: data.artist.name,
                id: data.artist.id,
                picture: data.artist.picture,
                picture_medium: data.artist.picture_medium,
              }
            : undefined,
          album: data.album
            ? {
                id: data.album.id,
                title: data.album.title,
                cover: data.album.cover,
                cover_medium: data.album.cover_medium,
                cover_big: data.album.cover_big,
              }
            : undefined,
          type: "deezer",
        });
      } catch (error) {
        console.error("Error Fetching from deezer by ID :", error);
        toast.error("Error Fetching from deezer by ID  `: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    getTrack();
  }, [id]);

  return { song, isLoading };
}
//
//
//
//
// setSong({
//   song_title: data.song_title,
//   song_id: data.song_id,
//   song_url: data.song_url,
//   duration: data.duration,
//   artist: data.song_artist,
//   image_url: data.image_url,
//   user_id: data.user_id,
//   playlist_id: data.playlist_id,
//   type: "playlist",
// });
// setSong({
//   song_title: data.song_title,
//   song_id: data.song_id,
//   song_url: data.song_url,
//   duration: data.duration,
//   artist: data.song_artist,
//   image_url: data.image_url,
//   user_id: data.user_id,
//   playlist_id: data.playlist_id,
//   type: "playlist",
// });
