import CocktailDTO from "./CocktailDTO";
import ICocktailRepository from "./ICocktailRepository";

export default class CocktailService {
  private static _instance: CocktailService;
  private static _repoPromise: Promise<ICocktailRepository> | null = null;
  private static _resolveRepo: ((repo: ICocktailRepository) => void) | null = null;

  private constructor() {} // no repo stored in instance

  public static init(repo: ICocktailRepository): void {
    if (this._resolveRepo) {
      this._resolveRepo(repo);

      return;
    }

    this._repoPromise = Promise.resolve(repo);
  }

  private static async getRepo(): Promise<ICocktailRepository> {
    if (!this._repoPromise) {
      this._repoPromise = new Promise((resolve) => {
        this._resolveRepo = resolve;
      });
    }
    return this._repoPromise;
  }

  public static get instance(): CocktailService {
    if (!this._instance) {
      this._instance = new CocktailService();
    }
    return this._instance;
  }

  /**
   * Returns top N cocktails sorted by popularity
   * @param limit - Number of cocktails to return (default: 5)
   */
  public async getPopular(limit: number = 5): Promise<CocktailDTO[]> {
    const repo = await CocktailService.getRepo();
    return repo.getPopular(limit);
  }

  /**
   * Returns a page of cocktails using offset/limit pagination
   * @param offset - Number of items to skip (default: 0)
   * @param limit - Number of items to return (default: 10)
   */
  public async getPage(offset: number = 0, limit: number = 10) {
    const repo = await CocktailService.getRepo();
    return repo.getAll({ offset, limit });
  }

  /**
   * Searches for cocktails by name
   * @param query - Search term to match against cocktail names
   * @returns Promise resolving to array of matching cocktail DTOs
   */
  public async search(query: string): Promise<CocktailDTO[]> {
    const repo = await CocktailService.getRepo();
    return repo.search(query);
  }

  public async getSuggestions(query: string): Promise<Array<{ name: string }>> {
    if (query === "") {
      return [];
    }

    const repo = await CocktailService.getRepo();
    const allCocktails = await repo.getAllCocktails();

    return allCocktails
      .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5)
      .map((c) => ({ name: c.name }));
  }
}
