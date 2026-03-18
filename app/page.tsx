import Section from "./components/00_fundaments/section/section";
import Visual from "./components/02_molecules/visual/visual";
import SectionPopularCocktails from "./components/03_organisms/section-popular-cocktails/section-popular-cocktails";

export default function Home() {
  return (
    <Section>
      <Visual
        data-aspect-ratio="panorama"
        src="/images/cocktails.jpg"
        alt="Interior of a cocktail bar"
      />

      <SectionPopularCocktails />
    </Section>
  );
}
