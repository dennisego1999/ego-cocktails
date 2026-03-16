import ICocktail from "./ICocktail";

export default interface ICocktailClient {
  getPage(offset?: number, limit?: number): Promise<{ cocktails: ICocktail[]; hasNext: boolean }>;
  getPopular(limit?: number): Promise<ICocktail[]>;
  search(query: string): Promise<ICocktail[]>;
  getAll(): Promise<ICocktail[]>;
}
