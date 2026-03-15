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
    const { cocktails: allCocktails } = await this.repo.getAll({ paginate: false });
    return allCocktails.sort((a, b) => b.popularity - a.popularity).slice(0, limit);
  }

  /**
   * Returns a page of cocktails
   * @param page - Page number (1-indexed)
   * @param pageSize - Number of items per page (default: 10)
   */
  public async getPage(page: number = 1, pageSize: number = 10) {
    const offset = (page - 1) * pageSize;
    return this.repo.getAll({ offset, limit: pageSize, paginate: true });
  }
}
