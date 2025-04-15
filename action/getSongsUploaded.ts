import { type Tracks } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getSongsUploaded(): Promise<Tracks[]> {
  const supabase = createServerComponentClient({ cookies: () => cookies() });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError || !sessionData.user) {
    console.log(
      "Error fetching session or no active session:",
      sessionError?.message
    );
    return [];
  }

  const { data, error } = await supabase
    .from("uploaded_songs")
    .select("*")
    .eq("user_id", sessionData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Fetching Uploaded Songs Failed:", error.message);
    return [];
  }

  return data;
}

export default getSongsUploaded;
