import { useEffect, useState } from "react";

interface DeezerTrack {
  id: number;
  title: string;
  preview: string;
  [key: string]: any; // in case you want more fields
}

export function useDeezerPreviewUrl(trackId?: number) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackId) return;

    const fetchPreviewUrl = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.deezer.com/track/${trackId}`);
        if (!res.ok) throw new Error("Failed to fetch track");

        const data: DeezerTrack = await res.json();
        setUrl(data.preview);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewUrl();
  }, [trackId]);

  return { url, loading, error };
}
