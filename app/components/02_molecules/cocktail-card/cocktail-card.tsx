import Section from "../../00_fundaments/section/section";
import Heading from "../../01_atoms/heading/heading";
import Text from "../../01_atoms/text/text";
import Card from "../card/card";
import CocktailCardProps from "./cocktail-card-props";

export default function CocktailCard({ cocktail, href }: CocktailCardProps) {
  return (
    <Card
      href={href}
      header={
        <Heading tag="h2" size="5">
          {cocktail.name}
        </Heading>
      }
      content={
        <Section>
          <Text>Glass {cocktail.glass}</Text>

          <Text>Category: {cocktail.category}</Text>

          <Text>Ingredients: {cocktail.ingredients.length}</Text>
          {cocktail.preparation && <Text>Prep: {cocktail.preparation}</Text>}
        </Section>
      }
      footer={
        <Section>
          {cocktail.popularity && (
            <Text className="popularity-badge">Popularity: {cocktail.popularity}</Text>
          )}
          {cocktail.garnish && <Text className="garnish-note">{cocktail.garnish}</Text>}
        </Section>
      }
    />
  );
}
