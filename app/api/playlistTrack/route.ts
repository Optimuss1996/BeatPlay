import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const offset = (page - 1) * limit;

  const res = await fetch(
    `https://example.com/api/items?limit=${limit}&offset=${offset}`
  );
  const result = await res.json();

  return NextResponse.json({
    data: result.data,
    total: result.total,
  });
}
