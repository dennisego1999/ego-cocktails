import ICocktail from "./ICocktail";

export default interface ICocktailClient {
  getCocktails(): Promise<ICocktail[]>;
}
