import { AlbumType, Artist, SongDezzer } from "@/types";

export async function getTrendingTracks(number: number): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/tracks?limit=${number}`,
      {
        next: { revalidate: 604800 },
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

    return data.data.map((song: any) => ({
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
  } catch (error) {
    console.error("Error fetching trending tracks:", error);
    return [];
  }
}

//
//
export async function getPopularArtist(number: number): Promise<Artist[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/artists?limit=${number}`,
      {
        next: { revalidate: 604800 },
      }
    );

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
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
    return [];
  }
}
//
//
export async function getArtistTopTracks(
  artistId: number | string,
  limit: number
): Promise<SongDezzer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/artist/${artistId}/top?limit=${limit}`,
      {
        next: { revalidate: 604800 },
      }
    );

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    return data.data.map((song: any) => ({
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
  } catch (error) {
    console.error("Error fetching Artist Top Tracks:", error);
    return [];
  }
}
//
//
export async function getArtistAlbums(
  artistId: number | string,
  limit: number
): Promise<AlbumType[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/artist/${artistId}/albums?limit=${limit}`,
      {
        next: { revalidate: 604800 },
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
): Promise<Artist | null> {
  try {
    const res = await fetch(`https://api.deezer.com/artist/${artistId}`, {
      next: { revalidate: 604800 },
    });

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return null;
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
    return null;
  }
}
export async function getDeezerTrackById(
  trackId: number
): Promise<SongDezzer | null> {
  try {
    const res = await fetch(`https://api.deezer.com/track/${trackId}`);

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = await res.json();

    if (data.error) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return null;
    }

    return {
      song_id: data.id,
      song_title: data.title,
      song_titleShort: data.title_short,
      song_url: data.preview,
      duration: data.duration,
      artist: {
        name: data.artist.name,
        id: data.artist.id,
        picture: data.artist.picture,
        picture_medium: data.artist.picture_medium,
      },
    };
  } catch (error) {
    console.error("Error fetching trending tracks:", error);
    return null;
  }
}
