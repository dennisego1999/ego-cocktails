import CocktailDTO from "./CocktailDTO";

export default interface ICocktailRepository {
  getPage(options?: {
    offset?: number;
    limit?: number;
  }): Promise<{ cocktails: CocktailDTO[]; hasNext: boolean }>;
  getAll(): Promise<CocktailDTO[]>;
  getPopular(limit?: number): Promise<CocktailDTO[]>;
  search(query: string): Promise<CocktailDTO[]>;
}
