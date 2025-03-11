import { AlbumType, Artist, SongDezzer } from "@/types";

export async function getTrendingTracks(number: number): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/tracks?limit=${number}`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
      }
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(`Deezer API Error: ${data.error.message}`);
    }

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
      `https://api.deezer.com/chart/0/artists?limit=${number}`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
      }
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return data.data.map((artist: any) => ({
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
//
//
export async function getArtistTopTracks(
  artistId: number | string,
  limit = 30
): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/artist/${artistId}/top?limit=${limit}`,
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
    console.error("Error fetching Artist Top Tracks:", error);
    throw new Error("Failed to fetch Artist Top Tracks. Please try again.");
  }
}
//
//
export async function getArtistAlbums(
  artistId: number | string
): Promise<AlbumType[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/artist/${artistId}/albums`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
      }
    );

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data.map((album: any) => ({
      id: album.id,
      title: album.title,
      cover: album.cover,
      cover_medium: album.cover_medium,
      cover_big: album.cover_big,
      fans: album.fans,
      release_date: album.release_date,
    }));
  } catch (error) {
    console.error("Error fetching artist albums:", error);
    return [];
  }
}
//
//
export async function getArtistInformation(
  artistId: number | string
): Promise<Artist> {
  try {
    const res = await fetch(`https://api.deezer.com/artist/${artistId}`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
    });

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Since you're fetching data for one artist, return a single artist object, not an array
    return {
      id: data.id,
      name: data.name,
      picture_small: data.picture_small,
      picture_medium: data.picture_medium,
      picture_big: data.picture_big,
      number_album: data.nb_album,
      number_fan: data.nb_fan,
    };
  } catch (error) {
    console.error("Error fetching Artist Information:", error);
    throw new Error("Failed to fetch Artist Information. Please try again.");
  }
}
