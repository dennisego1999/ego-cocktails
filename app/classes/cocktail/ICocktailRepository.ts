import CocktailDTO from "./CocktailDTO";

export default interface ICocktailRepository {
  getAll(options?: {
    offset?: number;
    limit?: number;
    paginate?: boolean;
  }): Promise<{ cocktails: CocktailDTO[]; hasNext?: boolean }>;
  getPopular(limit?: number): Promise<CocktailDTO[]>;
  search(query: string): Promise<CocktailDTO[]>;
}
