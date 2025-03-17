"use client";

import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Select from "@/app/components/Select";
import { usePlaylistIdStore } from "@/hooks/usePlaylistId";
import { Playlist } from "@/types";
import { ScaleLoader } from "react-spinners";

export const revalidate = 0;
export default function UploadModal() {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const usePlaylistId = usePlaylistIdStore();

  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      singer: "",
      image: null,
      song: null,
    },
  });

  // Fetch playlists from Supabase
  useEffect(() => {
    async function getPlaylists() {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching playlists:", error);
        return;
      }

      setPlaylists(data || []);
    }

    getPlaylists();
  }, []);

  // Function to handle modal close
  function onChange(open: boolean) {
    if (!open) {
      reset();
      setIsLoading(false);
      setAbortController(null);
      return uploadModal.onClose();
    }
  }

  // Handle song upload
  async function onSubmit(values: FieldValues) {
    try {
      setIsLoading(true);
      const controller = new AbortController();
      setAbortController(controller);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        3;
        toast.error("Missing fields values");
        return;
      }

      const uniqueID = uniqid();
      const songPath = `song-${values.title}-${uniqueID}`;
      // Upload song to storage
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(songPath, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song.");
      }

      // Get the public URL of the uploaded song
      const { data: songDataUrl } = supabaseClient.storage
        .from("songs")
        .getPublicUrl(songPath);
      const songPublicUrl = songDataUrl.publicUrl;
      //
      const imagePath = `image-${values.title}-${uniqueID}`;
      // Upload image to storage
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      // Get the public URL of the uploaded song
      const { data: imageDataUrl } = supabaseClient.storage
        .from("images")
        .getPublicUrl(imagePath);
      const imagePublicUrl = imageDataUrl.publicUrl;

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image.");
      }

      // Ensure user has selected a valid option (Liked Songs or Playlist)
      if (!usePlaylistId.id) {
        setIsLoading(false);
        return toast.error(
          "Please select a playlist or Liked Songs before uploading."
        );
      }

      let tableName = "playlist_songs";
      let insertData: any = {
        user_id: user.id,
        song_title: values.title,
        song_artist: values.singer,
        song_image: imageData.path,
        image_url: imagePublicUrl,
        song_path: songData.path,
        song_url: songPublicUrl,
      };

      if (usePlaylistId.id === "liked_songs") {
        tableName = "liked_songs";
      } else {
        insertData = {
          ...insertData,
          playlist_id: usePlaylistId.id, // Assign the selected playlist ID
        };
      }

      // Insert into the correct table
      const { error: supabaseError } = await supabaseClient
        .from(tableName)
        .insert(insertData);

      if (supabaseError) {
        console.error(`Error inserting into ${tableName}:`, supabaseError);
        setIsLoading(false);
        return toast.error(
          `Failed to add to ${
            usePlaylistId.id === "liked_songs" ? "Liked Songs" : "Playlist"
          }`
        );
      }

      // Refresh UI and reset form
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Upload Music"
      description="Upload your music to a playlist or liked songs"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          type="text"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="singer"
          type="text"
          disabled={isLoading}
          {...register("singer", { required: true })}
          placeholder="Artist Name"
        />
        <div className="flex flex-col gap-y-2">
          <p>Select a song file</p>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <p>Select an image file</p>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register("image", { required: true })}
            accept="image/*"
          />
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <p>Add to Playlist or Liked Songs</p>
          <Select playlists={playlists} isLoading={isLoading} />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <ScaleLoader width={2} height={17} /> : "Upload"}
        </Button>
      </form>
    </Modal>
  );
}
