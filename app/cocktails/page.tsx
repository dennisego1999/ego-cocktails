import CocktailService from "@/app/classes/cocktail/CocktailService";
import SectionCocktailOverview from "../components/03_organisms/section-cocktail-overview/section-cocktail-overview";
import CocktailDTO from "../classes/cocktail/CocktailDTO";

export default async function CocktailsPage() {
  // Fetch first page on the server
  const initialData = await CocktailService.instance.getPage();

  // Convert DTOs to plain objects for client transmission
  const plainCocktails = initialData.cocktails.map((cocktail) => cocktail.toJSON() as CocktailDTO);

  return (
    <SectionCocktailOverview
      initialCocktails={plainCocktails}
      initialHasNext={initialData.hasNext ?? false}
    />
  );
}
