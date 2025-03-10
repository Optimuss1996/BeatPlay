import { Artist, SongDezzer } from "@/types";

export async function getTrendingTracks(number: number): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/tracks?limit=${number}`,
      {
        cache: "no-store", // Prevents stale data
      }
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    const data = JSON.parse(text);

    return data.data.map((song: any) => ({
      id: song.id,
      title: song.title,
      titleShort: song.title_short,
      preview: song.preview,
      artist: {
        name: song.artist.name,
        id: song.artist.id,
        picture: song.artist.picture,
        picture_medium: song.artist.picture_medium,
      },
      album: {
        id: song.album.id,
        title: song.album.title,
        cover: song.album.cover,
      },
    }));
  } catch (error) {
    console.error("Error fetching trending tracks:", error);
    throw new Error("Failed to fetch trending tracks. Please try again.");
  }
}

//
//
export async function getPopularArtist(number: number): Promise<Artist[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/artists?limit=${number}`
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.data.map((artist: Artist) => ({
      id: artist.id,
      name: artist.name,
      picture_small: artist.picture_small,
      picture_medium: artist.picture_medium,
    }));
  } catch (error) {
    console.error("Error fetching trending tracks:", error);
    throw new Error("Failed to fetch trending tracks. Please try again.");
  }
}
