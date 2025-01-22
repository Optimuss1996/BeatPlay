import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "./components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Music",
  description: "Listen and Enjoy to music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Sidebar>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
