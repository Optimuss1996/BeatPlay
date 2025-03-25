import { AlbumType, SongDezzer } from "@/types";

export async function getAlbumDezzerApi(id: number): Promise<AlbumType> {
  try {
    const res = await fetch(`https://api.deezer.com/album/${id}`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
    });

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      id: data.id,
      title: data.title,
      cover: data.cover,
      cover_medium: data.cover_medium,
      cover_big: data.cover_big,
      fans: data.fans,
      release_date: data.release_date,
      nb_tracks: data.nb_tracks,
      duration: data.duration,
      artist: {
        id: data.artist.id,
        name: data.artist.name,
        picture_medium: data.artist.picture_medium,
        picture_big: data.artist.picture_big,
      },
    };
  } catch (error) {
    console.error("Error fetching Album", error);
    throw new Error("Failed to fetch Album , Please try again.");
  }
}
//
//
// get Album Tracks as a separated from DezzerApi
export async function getAlbumTracksDezzerApi(
  id: number
): Promise<SongDezzer[]> {
  try {
    const res = await fetch(`https://api.deezer.com/album/${id}`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days (604800 sec)
    });

    if (!res.ok) {
      throw new Error(`Deezer API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.tracks.data.map((song: any) => ({
      song_id: song.id,
      song_title: song.title,
      song_titleShort: song.title_short,
      song_url: song.preview,
      duration: song.duration,
      artist: {
        name: data.artist.name,
        id: data.artist.id,
        picture: data.artist.picture_medium,
        picture_medium: data.artist.picture,
      },
      album: {
        id: data.id,
        title: data.title,
        cover: data.cover_medium,
      },
    })); // Return only the track list
  } catch (error) {
    console.error("Error fetching Tracks Album", error);
    throw new Error("Failed to fetch Tracks Album , Please try again.");
  }
}
