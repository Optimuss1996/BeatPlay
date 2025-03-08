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
  artist: {
    name: string;
    id: string;
    picture: string; // Default artist cover image
    picture_medium: string;
  };
  album: {
    id: string;
    title: string;
    cover: string; // Default album cover image
    cover_medium: string;
    cover_big: string;
  };
};
export type Artist = {
  id: string;
  name: string;
  picture_small: string;
  picture_medium: string;
};
