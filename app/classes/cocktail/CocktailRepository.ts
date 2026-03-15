import ICocktailClient from "./ICocktailClient";
import CocktailDTO from "./CocktailDTO";
import ICocktailRepository from "./ICocktailRepository";
import CocktailFetchError from "./CocktailFetchError";
import CocktailSearchError from "./CocktailSearchError";

export default class CocktailRepository implements ICocktailRepository {
  constructor(private client: ICocktailClient) {
    //
  }

  async getAll(options?: {
    offset?: number;
    limit?: number;
  }): Promise<{ cocktails: CocktailDTO[]; hasNext: boolean }> {
    try {
      const response = await this.client.getCocktails(options?.offset, options?.limit);

      return {
        cocktails: response.cocktails.map((data) => CocktailDTO.fromResponse(data)),
        hasNext: response.hasNext,
      };
    } catch (e) {
      throw new CocktailFetchError({ cause: e });
    }
  }

  async getPopular(limit: number = 5): Promise<CocktailDTO[]> {
    try {
      const response = await this.client.getPopular(limit);
      return response.map((data) => CocktailDTO.fromResponse(data));
    } catch (e) {
      throw new CocktailFetchError({ cause: e });
    }
  }

  async search(query: string): Promise<CocktailDTO[]> {
    try {
      const response = await this.client.search(query);
      return response.map((data) => CocktailDTO.fromResponse(data));
    } catch (e) {
      throw new CocktailSearchError(query);
    }
  }
}
