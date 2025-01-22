import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemprops {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

export default function SidebarItem({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemprops) {
  return (
    <Link
      href={href}
      className={twMerge(
        ` flex items-center gap-x-4 h-auto w-full text-md font-medium hover:text-white cursor-pointer transition text-neutral-400 py-1  `,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className=" truncate w-full">{label}</p>
    </Link>
  );
}
