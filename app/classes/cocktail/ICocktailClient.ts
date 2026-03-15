import ICocktail from "./ICocktail";

export default interface ICocktailClient {
  getCocktails(
    offset?: number,
    limit?: number,
  ): Promise<{ cocktails: ICocktail[]; hasNext: boolean }>;

  getPopular(limit?: number): Promise<ICocktail[]>;
}
