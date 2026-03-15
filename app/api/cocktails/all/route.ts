// app/api/cocktails/all/route.ts
import cocktails from "../cocktails.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");

  const paginated = cocktails.slice(offset, offset + limit);
  const hasNext = offset + limit < cocktails.length;

  return NextResponse.json({
    cocktails: paginated,
    hasNext,
    total: cocktails.length,
    offset,
    limit,
  });
}
