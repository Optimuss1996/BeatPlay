"use client";

import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { AiOutlineMenu } from "react-icons/ai";
import useIsOpenSidebar from "@/hooks/useIsOpenSidebar";
import SearchInput from "./SearchInput";

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
        `h-fit bg-white dark:bg-slate-800/30  p-3 mt-2 md:mt-0 border-b border-gray-300 dark:border-gray-700  flex flex-col md:flex-row justify-between items-center `,
        className
      )}
    >
      <div className=" hidden md:block md:w-[500px]  ">
        <SearchInput />
      </div>
      <div className="w-full flex justify-between md:justify-end items-center ">
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
                className="bg-purple-700 text-white text-base  py-2 px-4 md:px-6 "
              >
                LogOut
              </Button>

              <Button
                onClick={() => router.push("/account")}
                className="bg-purple-700 text-white  mx-auto "
              >
                <FaUserAlt className="mx-auto" />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className=" bg-purple-700 text-white text-base px-6 py-2"
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" md:hidden block w-full  mt-6">
        <SearchInput />
      </div>
    </div>
  );
}
