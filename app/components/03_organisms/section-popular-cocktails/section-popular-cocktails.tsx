import CocktailService from "@/app/classes/cocktail/CocktailService";
import Section from "../../00_fundaments/section/section";
import Heading from "../../01_atoms/heading/heading";
import CocktailList from "../cocktail-list/cocktail-list";

export default async function SectionPopularCocktails() {
  const popularCocktails = await CocktailService.instance.getPopular();

  return (
    <Section
      className="section-popular-cocktails"
      padding="both"
      paddingSize="small"
      gutter="both"
      gap="tiny"
      theme="light"
    >
      <Heading>Most popular cocktails</Heading>

      <CocktailList cocktails={popularCocktails} />
    </Section>
  );
}
