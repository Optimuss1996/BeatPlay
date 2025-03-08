"use client";

import MediaItem from "@/app/(site)/components/MediaItem";
import LikeButton from "@/app/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProps {
  songs: Song[];
}

export default function LikedContent({ songs }: LikedContentProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, router, user]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col px-6 gap-y-2 w-full text-neutral-400">
        you have nothing liked songs
      </div>
    );
  }
  return (
    <div className="bg-purple-100 px-4 py-2 rounded-md">
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 p-1 w-full hover:rounded-md hover:bg-purple-200 transition"
        >
          <div className=" flex-1">
            <MediaItem
              onClick={(id: string) => {
                onPlay(id);
              }}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
