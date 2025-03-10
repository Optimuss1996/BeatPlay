"use client";

import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineMenu } from "react-icons/ai";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";

interface HeaderPropType {
  className?: string;
}

export default function Header({ className }: HeaderPropType) {
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();
  const isOpenSidebar = useIsOpenSidebar();

  async function handleLogOut() {
    const { error } = await supabaseClient.auth.signOut();
    // 🚨doing after : reset any playing song
    router.refresh;
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  }
  return (
    <div
      className={twMerge(
        `h-fit bg-white dark:bg-slate-800/30  p-3 mt-2 md:mt-0`,
        className
      )}
    >
      <div className="w-full flex justify-between md:justify-end items-center mb-4">
        <button
          onClick={isOpenSidebar.toggleSidebar}
          className="md:hidden  bg-purple-700 text-white p-2 rounded-full"
        >
          <AiOutlineMenu size={22} />
        </button>
        <div className=" flex justify-between items-center gap-x-2 md:gap-x-4">
          {user ? (
            <div className=" flex gap-x-4 items-center ">
              <Button
                onClick={handleLogOut}
                className="bg-purple-700 text-white text-sm md:text-base px-3 py-1 md:py-2 md:px-6 "
              >
                LogeOut
              </Button>

              <Button
                onClick={() => router.push("/account")}
                className="bg-purple-700 text-white  mx-auto hidden md:block"
              >
                <FaUserAlt className="mx-auto" />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className=" bg-purple-700 text-white text-sm md:text-base px-3 py-1 md:px-6  md:py-2"
                >
                  Login
                </Button>
              </div>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
