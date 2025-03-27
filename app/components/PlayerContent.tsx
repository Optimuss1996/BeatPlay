"use client";

import { likedTracks, SongDezzer } from "@/types";
import LikeButton from "@/app/liked/components/LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { FaMusic } from "react-icons/fa";
import AddToPlaylist from "../liked/components/AddToPlaylist";

interface PlayerContentProps {
  song: SongDezzer;
}

export default function PlayerContent({ song }: PlayerContentProps) {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  function onPlayNext() {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    console.log(currentIndex);
    const nextSong = player.ids[currentIndex + 1];
    console.log(nextSong);

    if (nextSong !== undefined) {
      player.setId(nextSong);
    } else {
      player.setId(player.ids[0]); // Loop to first song
    }
  }
  //
  //
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
      sound.play();
      return () => {
        sound.unload();
      };
    }
  }, [sound]);
  //
  //
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

  return (
    <div className=" h-full w-full grid grid-cols-2 md:grid-cols-3 ">
      <div className=" flex justify-start w-full">
        <div className=" flex items-center gap-x-4">
          <div className=" flex gap-x-3">
            <FaMusic size={20} className="text-purple-600 rounded-md" />
            <div className=" flex flex-col ">
              <p className=" md:text-sm text-xs font-semibold">
                {song.song_title}
              </p>
              <p className=" md:text-sm text-xs">{song.artist?.name}</p>
            </div>
          </div>
          {/* <LikeButton track={song} />
          <AddToPlaylist track={song} /> */}
        </div>
      </div>
      {/* this element for smaller md screen */}
      <div className=" md:hidden flex items-center justify-end w-full col-auto">
        <div
          onClick={handlePlay}
          className=" flex justify-center items-center p-1 rounded-full bg-white h-10 w-10 cursor-pointer"
        >
          <Icon size={30} className=" text-black" />
        </div>
      </div>
      {/* this element for bigger md screen */}
      <div className=" hidden md:flex justify-center items-center h-full w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className=" text-neutral-400 hover:text-white transition  cursor-pointer"
        />
        <div
          onClick={handlePlay}
          className="  flex items-center justify-end  h-10 w-10 bg-white p-1 rounded-full  "
        >
          <Icon size={30} className=" text-black transition cursor-pointer " />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className=" text-neutral-400 hover:text-white transition  cursor-pointer"
        />
      </div>
      <div className=" hidden md:flex justify-end w-full pr-2">
        <div className=" flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleVolume}
            size={34}
            className="text-neutral-400 hover:text-white transition cursor-pointer"
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}
