import { type Tracks } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getSongsLiked(
  page: number,
  limit: number
): Promise<{ data: Tracks[]; total: number }> {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError || !sessionData.user) {
    console.log(
      "Error fetching session or no active session:",
      sessionError?.message
    );
    return { data: [], total: 0 };
  }

  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await supabase
    .from("liked_songs")
    .select("*", { count: "exact" }) // 👈 important for total page calc
    .eq("user_id", sessionData.user.id)
    .order("created_at", { ascending: false })
    .range(start, end);

  if (error) {
    console.log("Fetching liked Songs Failed:", error.message);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count || 0 };
}
