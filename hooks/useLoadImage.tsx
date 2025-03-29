// "use client";

// import { Playlist, Song } from "@/types";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";

// export default function useLoadImage(song: Song | Playlist) {
//   const supabase = useSupabaseClient();

//   if (!song) {
//     return null;
//   }

//   const { data: imageData } = supabase.storage
//     .from("images")
//     .getPublicUrl(song.image_path);

//   return imageData.publicUrl;
// }
