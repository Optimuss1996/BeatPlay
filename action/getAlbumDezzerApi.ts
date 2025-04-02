import { AlbumType, Tracks } from "@/types";

export async function getAlbumDeezerApi(id: number): Promise<AlbumType | null> {
  try {
    const res = await fetch(`https://api.deezer.com/album/${id}`, {
      next: { revalidate: 604800 }, // Refresh data once every 7 days
    });

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return null;
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
    console.error("Error fetching album:", error);
    return null;
  }
}

//
//
// get Album Tracks as a separated from DezzerApi
export async function getAlbumTracksDezzerApi(id: number): Promise<Tracks[]> {
  try {
    const res = await fetch(`https://api.deezer.com/album/${id}`, {
      next: { revalidate: 604800 },
    });

    if (!res.ok) {
      console.warn(`Deezer API Error: ${res.status} ${res.statusText}`);
      return [];
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
    return [];
  }
}
