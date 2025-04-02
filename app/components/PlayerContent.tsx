"use client";

import { Tracks } from "@/types";
import LikeButton from "@/app/liked/components/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import ProgressBar from "@/app/components/ProgressBarTime"; // Import ProgressBar
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { FaMusic } from "react-icons/fa";
import AddToPlaylist from "../liked/components/AddToPlaylist";

interface PlayerContentProps {
  song: Tracks;
}

export default function PlayerContent({ song }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  function onPlayNext() {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (nextSong !== undefined) {
      player.setId(nextSong);
    } else {
      player.setId(player.ids[0]); // Loop to first song
    }
  }

  function onPlayPrevious() {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previous = player.ids[currentIndex - 1];

    if (previous !== undefined) {
      player.setId(previous);
    } else {
      player.setId(player.ids[player.ids.length - 1]); // Loop to last song
    }
  }

  const [play, { pause, sound }] = useSound(song.song_url, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        setCurrentTime(sound.seek() || 0);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.play();
      sound.on("end", onPlayNext); // Move to next only on actual finish
      return () => {
        sound.off("end", onPlayNext);
        sound.unload();
      };
    }
  }, [sound]);

  function handlePlay() {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  function toggleVolume() {
    setVolume(volume === 0 ? 1 : 0);
  }

  // Handle Seek bar change
  const handleSeek = (time: number) => {
    if (sound) {
      sound.seek(time);
      setCurrentTime(time);
    }
  };

  return (
    <div className="  h-full w-full grid grid-cols-2 lg:grid-cols-3">
      <div className="flex justify-start items-center gap-x-1 md:gap-x-3 w-full">
        <FaMusic size={30} className="text-purple-600 rounded-md" />
        <div className="flex flex-col gap-y-1  items-start ">
          <p className="md:text-sm text-xs font-semibold truncate">
            {song.song_title}
          </p>
          <p className="md:text-sm text-xs opacity-70">{song.artist?.name}</p>
        </div>
      </div>

      <div className=" flex flex-col gap-y-1 ">
        <div className="flex justify-end md:justify-center items-center h-full w-full max-w-[722px] gap-x-3">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={20}
            className="text-black dark:text-slate-300 hover:opacity-70 transition cursor-pointer"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 bg-purple-500 p-1 rounded-full"
          >
            <Icon size={25} className="text-white transition cursor-pointer" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={20}
            className="text-black dark:text-slate-300 hover:opacity-70 transition cursor-pointer"
          />
        </div>
        <div className=" hidden md:block">
          <div className="w-full md:w-4/5 mx-auto mt-4 md:mt-0">
            <ProgressBar
              currentTime={currentTime}
              duration={song.duration}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="hidden md:flex justify-end w-full pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleVolume}
            size={34}
            className="text-black dark:text-slate-300 hover:opacity-70 transition cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}
