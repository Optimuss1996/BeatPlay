import { type Tracks } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getSongsLiked(): Promise<Tracks[]> {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData.session) {
    console.log(
      "Error fetching session or no active session:",
      sessionError?.message
    );
    return [];
  }

  const { data, error } = await supabase
    .from("liked_songs")
    .select("*")
    .eq("user_id", sessionData.session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Fetching Songs Failed:", error.message);
    return [];
  }

  return data;
}

export default getSongsLiked;
