import cocktails from "../cocktails.json";
import { NextResponse } from "next/server";

export async function GET() {
  const sortedByPopularity = [...cocktails].sort((a, b) => b.popularity - a.popularity);

  const topFive = sortedByPopularity.slice(0, 5);

  return NextResponse.json(topFive);
}
