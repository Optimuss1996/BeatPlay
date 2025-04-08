import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BeatPlay music App",
    short_name: "BeatPlay",
    description: "listen music and enjoy it",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favoicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favoicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
