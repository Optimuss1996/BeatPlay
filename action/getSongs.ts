// import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// async function getSongs(): Promise<Song[]> {
//   const supabase = createServerComponentClient({
//     cookies: cookies,
//   });

//   const { data, error } = await supabase
//     .from("songs")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (error) {
//     console.log("Fetching Songs is Failed");
//   }
//   return (data as any) || [];
// }
//
//
//
//
//
//
//
// export default getSongs;

export async function getArtist(artistName: string) {
  try {
    const response = await fetch(`https://api.deezer.com/artist/${artistName}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch artist data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error);
    return null;
  }
}
