// hooks/useGenreTracks.ts
import { useEffect, useState } from "react";
import { Tracks } from "@/types";

const useGenreTracks = (genreId: number) => {
  const [tracks, setTracks] = useState<Tracks[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!genreId) return;

    const fetchTracks = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/deezer/genre?genreId=${genreId}`);
        const data = await res.json();

        if (!data.data) throw new Error("No tracks found");

        const cleaned: Tracks[] = data.data.map((song: any) => ({
          song_id: song.id,
          song_title: song.title,
          song_titleShort: song.title_short,
          song_url: song.preview,
          duration: song.duration,
          artist: {
            name: song.artist.name,
            id: song.artist.id,
            picture: song.artist.picture,
            picture_medium: song.artist.picture_medium,
          },
          album: {
            id: song.album.id,
            title: song.album.title,
            cover: song.album.cover,
          },
        }));

        setTracks(cleaned);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tracks");
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [genreId]);

  return { tracks, loading, error };
};

export default useGenreTracks;
