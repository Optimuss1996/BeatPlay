import { type Tracks } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export const useGetPlaylistSongById = (id?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    async function getSong() {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", id)
        .single();

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }

      setSong(data as Tracks);
      setIsLoading(false);
    }

    getSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};
export const useGetLikedSongById = (id?: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    async function getSong() {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", id)
        .single();

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }

      setSong(data as Tracks);
      setIsLoading(false);
    }

    getSong();
  }, [id, supabaseClient]);

  return useMemo(() => ({ isLoading, song }), [isLoading, song]);
};
//
//

export function useGetSongDeezerById(id?: number) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [song, setSong] = useState<Tracks | null>(null);

  useEffect(() => {
    if (!id) return;

    async function getTrack() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/getDeezerTrack?id=${id}`);

        if (!res.ok) {
          console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
          return null;
        }

        const data = await res.json();

        if (data.error) {
          console.warn(`Deezer API Error: ${data.error.message}`);
          toast.error("Error fetching Deezer track.");
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
          type: "deezer", // Assigning type explicitly for identification
        });
      } catch (error) {
        console.error("Error fetching Deezer Track:", error);
        toast.error("Failed to load track.");
      } finally {
        setIsLoading(false);
      }
    }

    getTrack();
  }, [id]);

  return { song, isLoading };
}
