import { PlaylistDeezer, PlaylistInfoDeezer, Tracks } from "@/types";

export async function getTopPlaylistDeezerApi(): Promise<PlaylistDeezer[]> {
  try {
    const res = await fetch(
      `https://api.deezer.com/chart/0/playlists?limit=12`,
      {
        next: { revalidate: 604800 }, // Refresh data once every 7 days
      }
    );

    if (!res.ok) {
      console.warn(
        `Deezer API Error For get top playlist: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();

    return data.data.map((playlist: any) => ({
      id: playlist.id,
      title: playlist.title,
      nb_tracks: playlist.nb_tracks,
      picture_medium: playlist.picture_medium,
      picture_big: playlist.picture_big,
      user: {
        id: playlist.user.id,
        name: playlist.user.name,
      },
    }));
  } catch (error) {
    console.error("Error fetching top deezer Playlist:", error);
    return null;
  }
}
export async function getPlaylistInfoDeezerApi(
  id: number
): Promise<PlaylistInfoDeezer | null> {
  try {
    const res = await fetch(`https://api.deezer.com/playlist/${id}`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days
    });

    if (!res.ok) {
      console.warn(
        `Deezer API Error For get playlist by id: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      nb_tracks: data.nb_tracks,
      fans: data.fans,
      duration: data.duration,
      picture_medium: data.picture_medium,
      picture_big: data.picture_big,
    };
  } catch (error) {
    console.error("Deezer API Error For get playlist by id:", error);
    return null;
  }
}
export async function getPlaylistTracks(id: number): Promise<Tracks[]> {
  try {
    const res = await fetch(`https://api.deezer.com/playlist/${id}/tracks`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
    });

    if (!res.ok) {
      console.warn(
        `Deezer API Error For Fetching Tracks Playlist : ${res.status} ${res.statusText}`
      );
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
    console.error("Deezer API Error For Fetching Tracks Playlist ", error);
    return [];
  }
}
