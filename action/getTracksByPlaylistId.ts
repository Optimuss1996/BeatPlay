import { type Tracks } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getTracksByPlaylistId(
  playlistId: string,
  page: number = 1,
  limit: number = 10
): Promise<{ data: Tracks[]; total: number }> {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("playlist_songs")
    .select("*", { count: "exact" }) // ⚠️ Required for total count
    .eq("playlist_id", playlistId)
    .order("added_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error fetching paginated playlist tracks:", error.message);
    return { data: [], total: 0 };
  }

  return {
    data: data as Tracks[],
    total: count || 0,
  };
}

export default getTracksByPlaylistId;
