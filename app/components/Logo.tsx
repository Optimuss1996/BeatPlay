import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" className=" ">
      <Image
        src={theme === "dark" ? "/WhiteLogo.png" : "/blackLogo.png"}
        alt="Logo"
        width={220}
        height={100}
      />
    </Link>
  );
}
