import cocktails from "../cocktails.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("q");

  if (!searchQuery) {
    return NextResponse.json([]);
  }

  const filteredCocktails = cocktails.filter((cocktail) => {
    return cocktail.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return NextResponse.json(filteredCocktails);
}
