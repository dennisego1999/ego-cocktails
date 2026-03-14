import ICocktailIngredient from "./ICocktailIngredient";

export default interface ICocktail {
  name: string;
  glass: string;
  category?: string;
  popularity: number;
  ingredients: ICocktailIngredient[];
  garnish?: string;
  preparation?: string;
}
