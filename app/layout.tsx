import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Player from "./components/Player";
import { ThemeProvider } from "next-themes";
import { getPlaylists } from "@/action/getPlaylists";
import App from "./components/App";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: " %s / BeatPlay Music ",
    default: " Welcome / To BeatPlay Music ",
  },
  description: "Listen and Enjoy to music",
  icons: {
    icon: [
      {
        url: "/favoicon.png",
        type: "image/png",
      },
    ],
  },
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlaylists = await getPlaylists();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} `}>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <App playlists={userPlaylists}>{children}</App>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
