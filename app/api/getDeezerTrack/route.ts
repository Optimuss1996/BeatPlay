// Deezer’s API does not allow direct client-side requests due to CORS restrictions.three are solutions:

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

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
        { error: "Failed to fetch from route.ts track" },
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
//
//
// export async function GETURL(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return NextResponse.json(
//       { error: "Track ID is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const response = await fetch(`https://api.deezer.com/track/${id}`);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Failed to fetch track" },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data, {
//       headers: { "Access-Control-Allow-Origin": "*" },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
//
//
//
//
// export async function GetTracks() {
//   try {
//     const response = await fetch(
//       "https://api.deezer.com/playlist/3155776842/tracks?limit=10"
//     );

//     if (!response.ok) {
//       console.error("Failed to fetch tracks from Deezer");
//       return [];
//     }

//     const data = await response.json();

//     return new Response(JSON.stringify(data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: "Failed to fetch from Deezer" }),
//       { status: 500 }
//     );
//   }
// }
