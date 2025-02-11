"use client";

import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";

interface HeaderPropType {
  children: React.ReactNode;
  className?: string;
}

export default function Header({ children, className }: HeaderPropType) {
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { user } = useUser();

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
        `h-fit bg-gradient-to-b from-emerald-800  p-6`,
        className
      )}
    >
      <div className="w-full flex justify-between items-center mb-4">
        {/* this div for larger than md screen display  */}
        <div className=" hidden md:flex items-center gap-x-2 ">
          <button className=" flex justify-center items-center bg-black rounded-full hover:opacity-70 transition">
            <RxCaretLeft size={26} />
          </button>
          <button className=" flex justify-center items-center bg-black rounded-full hover:opacity-70 transition">
            <RxCaretRight size={26} />
          </button>
        </div>

        {/* this div for smaller than md screen display  */}
        <div className="md:hidden flex items-center gap-x-2 ">
          <button className=" bg-white rounded-full flex justify-center items-center  p-2 transition hover:opacity-70">
            <HiHome size={20} className=" text-black " />
          </button>
          <button className="md:hidden bg-white rounded-full flex justify-center items-center  p-2 transition hover:opacity-70">
            <BiSearch size={20} className=" text-black " />
          </button>
        </div>

        <div className=" flex justify-between items-center gap-x-4">
          {user ? (
            <div className=" flex gap-x-4 items-center ">
              <Button onClick={handleLogOut} className="bg-white px-6 py-2 ">
                LogeOut
              </Button>

              <Button
                onClick={() => router.push("/account")}
                className="bg-white  mx-auto"
              >
                <FaUserAlt className="mx-auto" />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className=" text-neutral-300 bg-transparent font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className=" bg-white px-6 py-2">
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
