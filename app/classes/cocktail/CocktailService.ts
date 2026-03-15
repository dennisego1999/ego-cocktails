import CocktailDTO from "./CocktailDTO";
import ICocktailRepository from "./ICocktailRepository";

export default class CocktailService {
  private static _instance: CocktailService;

  private constructor(private repo: ICocktailRepository) {
    //
  }

  public static get instance(): CocktailService {
    if (!this._instance) {
      throw new Error("CocktailService has not been initialized. Call init() first.");
    }

    return this._instance;
  }

  public static init(repo: ICocktailRepository): CocktailService {
    if (!this._instance) {
      this._instance = new CocktailService(repo);
    }

    return this._instance;
  }

  /**
   * Returns top N cocktails sorted by popularity
   * @param limit - Number of cocktails to return (default: 5)
   */
  public async getPopular(limit: number = 5): Promise<CocktailDTO[]> {
    return this.repo.getPopular(limit);
  }

  /**
   * Returns a page of cocktails using offset/limit pagination
   * @param offset - Number of items to skip (default: 0)
   * @param limit - Number of items to return (default: 10)
   */
  public async getPage(offset: number = 0, limit: number = 10) {
    return this.repo.getAll({ offset, limit });
  }

  /**
   * Searches for cocktails by name
   * @param query - Search term to match against cocktail names
   * @returns Promise resolving to array of matching cocktail DTOs
   */
  public async search(query: string): Promise<CocktailDTO[]> {
    return this.repo.search(query);
  }
}
