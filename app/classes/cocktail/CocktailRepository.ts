import ICocktailClient from "./ICocktailClient";
import CocktailDTO from "./CocktailDTO";
import ICocktailRepository from "./ICocktailRepository";
import CocktailFetchError from "./CocktailFetchError";

export default class CocktailRepository implements ICocktailRepository {
  constructor(private client: ICocktailClient) {
    //
  }

  async getAll(options?: {
    offset?: number;
    limit?: number;
    paginate?: boolean;
  }): Promise<{ cocktails: CocktailDTO[]; hasNext?: boolean }> {
    try {
      const response = await this.client.getCocktails();
      const allCocktails = response.map((data) => CocktailDTO.fromResponse(data));

      // If pagination is disabled, return everything
      if (options?.paginate === false) {
        return { cocktails: allCocktails };
      }

      // Otherwise apply pagination
      const offset = options?.offset ?? 0;
      const limit = options?.limit ?? 10;
      const paginated = allCocktails.slice(offset, offset + limit);
      const hasNext = offset + limit < allCocktails.length;

      return {
        cocktails: paginated,
        hasNext,
      };
    } catch (e) {
      throw new CocktailFetchError({ cause: e });
    }
  }
}
