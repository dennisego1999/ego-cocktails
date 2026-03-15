import CocktailService from "@/app/classes/cocktail/CocktailService";
import SectionCocktailOverview from "../components/03_organisms/section-cocktail-overview/section-cocktail-overview";
import CocktailDTO from "../classes/cocktail/CocktailDTO";

export default async function CocktailsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  // Fetch data based on URL param
  let initialCocktails: CocktailDTO[];
  let initialHasNext: boolean;

  if (q) {
    // If search param exists, fetch search results directly
    const results = await CocktailService.instance.search(q);
    initialCocktails = results;

    // Search results aren't paginated
    initialHasNext = false;
  } else {
    // Normal paginated first page
    const initialData = await CocktailService.instance.getPage();
    initialCocktails = initialData.cocktails;
    initialHasNext = initialData.hasNext ?? false;
  }

  // Convert DTOs to plain objects for client transmission
  const plainCocktails = initialCocktails.map((cocktail) => cocktail.toJSON() as CocktailDTO);

  return (
    <SectionCocktailOverview
      initialCocktails={plainCocktails}
      initialHasNext={initialHasNext}
      initialSearchQuery={q}
    />
  );
}
