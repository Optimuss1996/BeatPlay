import { useEffect, useState } from "react";

export function useSongLoadUrl(trackId?: number) {
  const [songUrl, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!trackId) return;

    const fetchPreviewUrl = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/getDeezerTrack?id=${trackId}`);
        if (!res.ok) {
          console.warn("Failed to fetch url track");
          return null;
        }

        const data = await res.json();
        setUrl(data.preview);
      } catch (err: any) {
        setError(err.message || "Something went wrong for fetching url song");
        setUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviewUrl();
  }, [trackId]);

  return { songUrl, loading, error };
}
