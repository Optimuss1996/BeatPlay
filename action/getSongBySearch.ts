import { AlbumType, Artist, Tracks } from "@/types";
//get list of artist by searching in input
export async function getArtistBySearch(
  searchQuery: string
): Promise<Artist[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/artist?q=${searchQuery}&limit=5&order=Ranking`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    if (data.error) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    return data.data.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      picture_medium: artist.picture_medium,
      picture_big: artist.picture_big,
    }));
  } catch (error) {
    console.error("Error fetching artist search:", error);
    return [];
  }
}
//
//
//
//get list of albums by searching in input
export async function getAlbumBySearch(
  searchQuery: string
): Promise<AlbumType[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/album?q=${searchQuery}&limit=5&order=Ranking`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();

    return data.data.map((album: any) => ({
      id: album.id,
      title: album.title,
      cover_big: album.cover_big,
      artist: { name: album.artist.name, id: album.artist.id },
    }));
  } catch (error) {
    console.error("Error fetching albums by search:", error);
    return [];
  }
}
//
//
//get list of tracks by searching in input
export async function getTracksBySearch(
  searchQuery: string,
  limit: number,
  index: number
): Promise<{ data: Tracks[]; total: number }> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/track?q=${searchQuery}&limit=${limit}&order=RANKING&index=${index}`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
      }
    );

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return { data: [], total: 0 };
    }

    const result = await res.json();

    const tracks: Tracks[] = result.data.map((song: any) => ({
      song_id: song.id,
      song_title: song.title,
      song_titleShort: song.title_short,
      song_url: song.preview,
      duration: song.duration,
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

    return { data: tracks, total: result.total };
  } catch (error) {
    console.error("Error fetching tracks by search", error);
    return { data: [], total: 0 };
  }
}
//
//
// export async function getArtistAlbums(
//   artistId: number | string,
//   limit: number
// ): Promise<AlbumType[]> {
//   try {
//     const res = await fetch(
//       `https://api.deezer.com/artist/${artistId}/albums?limit=${limit}`,
//       {
//         next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
//     }

//     const data = await res.json();
//     return data.data.map((album: any) => ({
//       id: album.id,
//       title: album.title,
//       cover: album.cover,
//       cover_medium: album.cover_medium,
//       cover_big: album.cover_big,
//       fans: album.fans,
//       release_date: album.release_date,
//     }));
//   } catch (error) {
//     console.error("Error fetching artist albums:", error);
//     return [];
//   }
// }
// //
// //
// export async function getArtistInformation(
//   artistId: number | string
// ): Promise<Artist> {
//   try {
//     const res = await fetch(`https://api.deezer.com/artist/${artistId}`, {
//       next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
//     });

//     if (!res.ok) {
//       throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
//     }

//     const data = await res.json();

//     // Since you're fetching data for one artist, return a single artist object, not an array
//     return {
//       id: data.id,
//       name: data.name,
//       picture_small: data.picture_small,
//       picture_medium: data.picture_medium,
//       picture_big: data.picture_big,
//       number_album: data.nb_album,
//       number_fan: data.nb_fan,
//     };
//   } catch (error) {
//     console.error("Error fetching Artist Information:", error);
//     throw new Error("Failed to fetch Artist Information. Please try again.");
//   }
// }

// https://api.deezer.com/album/${albumId}/tracks
