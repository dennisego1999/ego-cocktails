import ICocktailIngredient from "./ICocktailIngredient";

export default interface ICocktail {
  name: string;
  glass: string;
  category?: string | null;
  popularity: number;
  ingredients: ICocktailIngredient[];
  garnish?: string | null;
  preparation?: string | null;
}
