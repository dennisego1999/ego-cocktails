import Section from "../../00_fundaments/section/section";
import CocktailCard from "../../02_molecules/cocktail-card/cocktail-card";
import CocktailListProps from "./cocktail-list-props";

export default function CocktailList({ cocktails, ...rest }: CocktailListProps) {
  return (
    <Section className="cocktail-list" flexDirection="row" gap="tiny" wrap={true} {...rest}>
      {cocktails.map((cocktail) => (
        <CocktailCard key={cocktail.name} cocktail={cocktail} />
      ))}
    </Section>
  );
}
