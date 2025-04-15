"use client";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className=" relative">
        <p className=" text-2xl md:text-3xl font-ClashGrotesk text-purple-600">
          BeatPlay
        </p>
        <p className=" absolute -bottom-[12px] right-0 font-ClashGrotesk font-medium text-black dark:text-white text-sm">
          music
        </p>
      </div>
    </Link>
  );
}
