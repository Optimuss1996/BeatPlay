import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function PlaylistPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch the playlist by ID
  const { data: playlist, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error("Error fetching playlist:", error);
    return <p>Playlist not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-center bg-white dark:bg-slate-800/30 text-white">
        list of playlist
      </h1>
    </div>
  );
}
