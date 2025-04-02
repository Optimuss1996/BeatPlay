import { type Tracks } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getTracksByPlaylistId(playlistId: string): Promise<Tracks[]> {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  const { data, error } = await supabase
    .from("playlist_songs")
    .select("*")
    .eq("playlist_id", playlistId); // Filter by playlist_id

  if (error) {
    console.log("Something wrong about Fetching Tracks By Playlist Id ");
  }
  return (data as any) || [];
}

export default getTracksByPlaylistId;
