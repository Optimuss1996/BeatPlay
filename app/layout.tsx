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
import PwaInstallPrompt from "@/app/components/PwaInstallPrompt";
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
  manifest: "/manifest.json",
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className={`${inter.className} `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PwaInstallPrompt />
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
