import cocktails from "../cocktails.json";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("search");

  if (!searchQuery) {
    return NextResponse.json({ cocktails: [] });
  }

  const filteredCocktails = cocktails.filter((cocktail) => {
    cocktail.name.toLowerCase().includes(searchQuery.toLocaleString());
  });

  return NextResponse.json({ cocktails: filteredCocktails });
}
