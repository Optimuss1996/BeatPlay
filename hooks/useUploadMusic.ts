"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { usePlaylistIdStore } from "@/hooks/usePlaylistId";
import useGetAudioDuration from "@/hooks/useGetAudioDuration";

export default function useUploadMusic() {
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const usePlaylistId = usePlaylistIdStore();
  const { getAudioDuration } = useGetAudioDuration();
  // generate Unique song_id
  function generateUniqueSongId() {
    const timestamp = Date.now() % 1000000000; // Keep only last 9 digits
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);

    const randomNum = (randomArray[0] % 900000) + 100000; // Random 6-digit number

    return timestamp + randomNum; // Combine for a 9-digit unique ID
  }

  const song_id = generateUniqueSongId();

  async function uploadMusic(
    values: any,
    reset: () => void,
    onClose: () => void
  ) {
    try {
      setIsLoading(true);
      const controller = new AbortController();
      setAbortController(controller);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user || !usePlaylistId.id) {
        toast.error("Missing fields values");
        return;
      }

      const duration = await getAudioDuration(songFile);
      const finalDuration = Math.floor(duration);
      const uniqueID = uniqid();

      // Upload Song
      const songPath = `song-${values.title}-${uniqueID}`;
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(songPath, songFile, { cacheControl: "3600", upsert: false });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song.");
      }

      const songPublicUrl = supabaseClient.storage
        .from("songs")
        .getPublicUrl(songPath).data?.publicUrl;

      // Upload Image
      const imagePath = `image-${values.title}-${uniqueID}`;
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image.");
      }

      const imagePublicUrl = supabaseClient.storage
        .from("images")
        .getPublicUrl(imagePath).data?.publicUrl;

      // Insert into Playlist or Liked Songs
      let tableName = "playlist_songs";
      let insertData: any = {
        user_id: user.id,
        song_id: song_id,
        song_title: values.title,
        song_artist: values.singer,
        image_url: imagePublicUrl,
        song_url: songPublicUrl,
        duration: finalDuration,
      };

      if (usePlaylistId.id === "liked_songs") {
        tableName = "liked_songs";
      } else {
        insertData.playlist_id = usePlaylistId.id;
      }

      const { error: supabaseError } = await supabaseClient
        .from(tableName)
        .insert(insertData)
        .abortSignal(controller.signal);

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(
          `Failed to add to ${
            usePlaylistId.id === "liked_songs" ? "Liked Songs" : "Playlist"
          }`
        );
      }

      router.refresh();
      toast.success("Song uploaded successfully!");
      reset();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  function cancelUpload() {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
      toast.error("Uploading cancelled!!");
    }
  }

  return { isLoading, uploadMusic, cancelUpload };
}
