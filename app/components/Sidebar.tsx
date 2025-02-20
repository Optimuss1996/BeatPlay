"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

export default function Sidebar({ children, songs }: SidebarProps) {
  const pathname = usePathname();

  const route = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div className=" flex h-screen">
      <div className=" bg-black hidden md:flex flex-col gap-y-2 w-[300px] h-full p-2">
        <Box>
          <div className=" flex flex-col gap-y-4 px-4 py-5">
            {route.map((item) => (
              <SidebarItem key={item.label} {...item}></SidebarItem>
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className=" flex-1 h-full overflow-y-auto p-2 ">{children}</main>
    </div>
  );
}
