import Stripe from "stripe";

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Playlist {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image_path: string;
  image_url: string;
}
export interface PlaylistTracks {
  song_id: string;
  playlist_id: string;
  user_id: string;
  song_title: string;
  song_path: string;
  song_image: string;
  song_url: string;
  image_url: string;
  song_artist: string;
}

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export type SongDezzer = {
  id: number;
  title: string;
  titleShort: string;
  preview: string;
  duration: number;
  artist: {
    name: string;
    id: string;
    picture: string; // Default artist cover image
    picture_medium: string;
  };
  album?: {
    id: string;
    title: string;
    cover: string; // Default album cover image
    cover_medium: string;
    cover_big: string;
  };
};
export type Artist = {
  id: number | string;
  name: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  number_album?: number;
  number_fan?: number;
};
export type AlbumType = {
  id: string;
  title: string;
  cover: string;
  cover_medium: string;
  cover_big: string;
  fans: number;
  release_date: string;
};
