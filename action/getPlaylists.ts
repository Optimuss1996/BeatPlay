import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getPlaylists(): Promise<Playlist[]> {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError || !sessionData.user.id) {
    console.log(
      "Error fetching session or no active session:",
      sessionError?.message
    );
    return [];
  }

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", sessionData.user.id)
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
