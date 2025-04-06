// Deezer’s API does not allow direct client-side requests due to CORS restrictions.three are solutions:

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Track ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://api.deezer.com/track/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch track" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
//
//
// pages/api/deezer/genre.js

// export async function handler(req, res) {
//   const { genreId } = req.query;

//   if (!genreId) {
//     return res.status(400).json({ error: "Genre ID is required" });
//   }

//   try {
//     const response = await fetch(
//       `https://api.deezer.com/chart/${genreId}/tracks?limit=10`
//     );
//     const data = await response.json();

//     return res.status(200).json(data);
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to fetch from Deezer" });
//   }
// }
