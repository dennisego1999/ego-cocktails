import CocktailDTO from "@/app/classes/cocktail/CocktailDTO";

type SectionCocktailOverviewProps = {
  initialCocktails: CocktailDTO[];
  initialHasNext: boolean;
  initialSearchQuery?: string | null;
};

export default SectionCocktailOverviewProps;
