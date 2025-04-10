"use client";

import { FieldValues, useForm } from "react-hook-form";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { ScaleLoader } from "react-spinners";
import useUploadMusic from "@/hooks/useUploadMusic";

export const revalidate = 0;

export default function UploadModal() {
  const uploadModal = useUploadModal();
  const { isLoading, uploadMusic, cancelUpload } = useUploadMusic();

  const { register, reset, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      singer: "",
      image: null,
      song: null,
    },
  });

  function onChange(open: boolean) {
    if (!open) {
      cancelUpload();
      reset();
      uploadModal.onClose();
    }
  }

  return (
    <Modal
      title="Upload Music"
      description="Upload your music to your personal library"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit((values) =>
          uploadMusic(values, reset, uploadModal.onClose)
        )}
        className="flex flex-col gap-y-4"
      >
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
        <div>
          <p>Select a song file</p>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>
        <div>
          <p>Select an image file</p>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register("image", { required: true })}
            accept="image/*"
          />
        </div>

        <Button disabled={isLoading} type="submit">
          {isLoading ? <ScaleLoader width={2} height={15} /> : "Upload"}
        </Button>
      </form>
    </Modal>
  );
}
