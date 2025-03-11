import "./globals.css";
import type { Metadata } from "next";
import { Figtree, Dela_Gothic_One, Luckiest_Guy } from "next/font/google";
import Sidebar from "./components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Player from "./components/Player";
import { ThemeProvider } from "next-themes";
import getPlaylists from "@/action/getPlaylists";

const inter = Figtree({ subsets: ["latin"], variable: "--font-inter" });
const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-delaGothic",
});
const LuckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-LuckiestGuy",
});

export const metadata: Metadata = {
  title: "Spotify Music",
  description: "Listen and Enjoy to music",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlaylists = await getPlaylists();
  // console.log(userPlaylists);

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${inter.variable} ${delaGothic.variable} ${LuckiestGuy.variable}`}
    >
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar playlists={userPlaylists}>{children}</Sidebar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
