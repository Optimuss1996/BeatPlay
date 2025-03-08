import { useRef, useState } from "react";
import usePlayListModal from "@/hooks/usePlayListModal";
import Modal from "./Modal";
import uniqid from "uniqid";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFileImage } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PlayListModal() {
  const { onClose, isOpen } = usePlayListModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, reset, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true }); // ✅ Correctly registers file in react-hook-form
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage("");
    setFileName("");
  };

  function onChange(open: boolean) {
    if (!open) {
      onClose();
      reset();
      handleRemoveFile();
    }
  }

  async function onSubmit(values: FieldValues) {
    setIsLoading(true);
    console.log("Form values:", values); // ✅ Added debugging log

    const imageFile = values.image; // ✅ Fixed: Avoids error when accessing undefined value
    const title = values.title;
    const description = values.description;

    if (!imageFile || !title || !user) {
      toast.error("Missing required fields");
      return; // ✅ Fixed: Return early to prevent further execution
    }

    try {
      const uniqueID = uniqid();
      console.log("Uploading image to Supabase Storage...");

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        console.error("Image Upload Error:", imageError); // ✅ Added error logging
        setIsLoading(false);
        toast.error("Failed image upload.");
        return; // ✅ Fixed: Return early to prevent further execution
      }

      console.log("Image uploaded successfully:", imageData); // ✅ Debugging log

      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          title: title,
          description: description,
          image_path: imageData.path,
        });

      if (supabaseError) {
        console.error("Supabase Insert Error:", supabaseError); // ✅ Added error logging
        setIsLoading(false);
        toast.error("Something went wrong");
        return; // ✅ Fixed: Return early to prevent further execution
      }

      console.log("Playlist created successfully!"); // ✅ Debugging log

      router.refresh();
      toast.success("Playlist created!");
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error); // ✅ Added error logging
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create your own playlist"
      description="Categorize your favorite music so you don't miss it!"
      isOpen={isOpen}
      onChange={onChange}
      className="md:max-w-[800px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-1">
        <div className="flex flex-col md:flex-row gap-y-3 gap-x-5 items-center">
          <div>
            <div className="flex justify-center items-center">
              <div className="bg-purple-200 rounded-lg w-48 flex flex-col justify-center items-center">
                <div className="w-full h-52 rounded-lg border-dashed border-2 shadow-lg text-purple-600 flex justify-center items-center overflow-hidden">
                  {image ? (
                    <img
                      className="w-full object-cover"
                      src={image}
                      alt="Uploaded"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <AiOutlineCloudUpload size={60} />
                      <span>Browse File to upload!</span>
                    </div>
                  )}
                </div>

                <div className="w-full mt-2">
                  <div className="w-full flex justify-between items-center p-2 rounded-lg">
                    <FaRegFileImage
                      size={20}
                      className="text-purple-600 hover:text-black cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    />
                    <div>
                      {fileName ? "Selected file" : "Not selected file"}
                    </div>
                    <TiDelete
                      size={20}
                      className="text-purple-600 hover:text-black cursor-pointer rounded-full"
                      onClick={handleRemoveFile}
                    />
                  </div>
                </div>

                <input
                  id="image"
                  disabled={isLoading}
                  {...register("image", { required: true })}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-y-3 justify-center">
            <input
              id="title"
              disabled={isLoading}
              {...register("title", { required: true })}
              type="text"
              placeholder="Playlist name"
              className="bg-purple-200 w-full h-14 rounded-md outline-none border-none px-3 py-2 text-base text-black"
            />
            <textarea
              id="description"
              disabled={isLoading}
              {...register("description", { required: true })}
              placeholder="Description"
              className="h-48 w-full p-2 bg-purple-200 placeholder-gray-400 focus:outline-none rounded-md"
            />
          </div>
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-purple-400 mt-4"
        >
          Create Playlist
        </Button>
      </form>
    </Modal>
  );
}
