"use client";

import Link from "next/link";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="  dark:bg-slate-800/30 text-purple-300 py-6  border-t border-gray-400/50">
      <div className="max-w-5xl mx-auto text-center px-4 md:px-10">
        {/* Site Name */}
        <Link
          href="/"
          className="text-lg md:text-xl font-semibold hover:opacity-65 transition font-ClashGrotesk"
        >
          BeatPlay
        </Link>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 text-xl md:text-2xl my-4">
          <FaTwitter className="cursor-pointer hover:opacity-65 transition" />
          <FaYoutube className="cursor-pointer hover:opacity-65 transition" />
          <FaFacebookF className="cursor-pointer hover:opacity-65 transition" />
        </div>

        {/* Copyright */}
        <p className="text-sm md:text-base ">
          Copyright © {new Date().getFullYear()} - All rights reserved by
          BeatPlay
        </p>
      </div>
    </footer>
  );
};

export default Footer;
