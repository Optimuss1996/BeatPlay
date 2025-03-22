import { AlbumType, Artist, SongDezzer } from "@/types";
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
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(`Deezer API Error: ${data.error.message}`);
    }

    return data.data.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      picture_small: artist.picture_small,
      picture_medium: artist.picture_medium,
    }));
  } catch (error) {
    console.error("Error fetching artist search:", error);
    throw new Error("Failed to fetch artist search. Please try again.");
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
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.data.map((album: any) => ({
      id: album.id,
      title: album.title,
      cover_big: album.cover_big,
      artist: { name: album.artist.name, id: album.artist.id },
    }));
  } catch (error) {
    console.error("Error fetching album by search:", error);
    throw new Error("Failed to fetch album by search. Please try again.");
  }
}
//
//
//get list of tracks by searching in input
export async function getTracksBySearch(
  searchQuery: string,
  limit: number
): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/search/track?q=${searchQuery}&limit=${limit}&order=RANKING`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
      }
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data.map((song: any) => ({
      id: song.id,
      title: song.title,
      titleShort: song.title_short,
      preview: song.preview,
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
  } catch (error) {
    console.error("Error fetching tracks by search", error);
    throw new Error("Failed to fetch tracks by search. Please try again.");
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
