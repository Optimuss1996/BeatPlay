"use client";

import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import useGetAudioDuration from "@/hooks/useGetAudioDuration";

export default function useUploadMusic() {
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const { getAudioDuration } = useGetAudioDuration();

  function generateUniqueSongId() {
    const timestamp = Date.now() % 1000000000;
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const randomNum = (randomArray[0] % 900000) + 100000;
    return timestamp + randomNum;
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

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields values");
        return;
      }

      const duration = await getAudioDuration(songFile);
      const finalDuration = Math.floor(duration);
      const uniqueID = uniqid();

      // Upload Song
      const songPath = `song-${values.title}-${uniqueID}`;
      const { error: songError } = await supabaseClient.storage
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
      const { error: imageError } = await supabaseClient.storage
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

      // Insert into uploaded_songs table
      const { error: supabaseError } = await supabaseClient
        .from("uploaded_songs")
        .insert({
          user_id: user.id,
          song_id,
          song_title: values.title,
          song_artist: values.singer,
          image_url: imagePublicUrl,
          song_url: songPublicUrl,
          duration: finalDuration,
        })
        .abortSignal(controller.signal);

      if (supabaseError) {
        setIsLoading(false);
        console.error("Supabase error:", supabaseError);
        return toast.error("Failed to upload song to uploaded_songs table.");
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
      toast.error("Uploading cancelled!");
    }
  }

  return { isLoading, uploadMusic, cancelUpload };
}
