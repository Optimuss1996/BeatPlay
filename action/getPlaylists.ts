import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getPlaylists(): Promise<Playlist[]> {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Something wrong about Fetching Playlist ");
  }
  return (data as any) || [];
}

// Fetch the playlist by ID
export async function getPlaylistById(playlistId: string): Promise<Playlist> {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (error) {
    console.log("Something wrong about Fetching Playlist by Id");
  }
  return (data as any) || [];
}
