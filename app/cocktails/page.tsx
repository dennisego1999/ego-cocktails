import CocktailService from "@/app/classes/cocktail/CocktailService";
import SectionCocktailOverview from "../components/03_organisms/section-cocktail-overview/section-cocktail-overview";

export default async function CocktailsPage() {
  // Fetch first page on the server
  const initialData = await CocktailService.instance.getPage();

  return (
    <SectionCocktailOverview
      initialCocktails={initialData.cocktails}
      initialHasNext={initialData.hasNext ?? false}
    />
  );
}
