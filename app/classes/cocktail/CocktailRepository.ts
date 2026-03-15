import ICocktailClient from "./ICocktailClient";
import CocktailDTO from "./CocktailDTO";
import ICocktailRepository from "./ICocktailRepository";
import CocktailFetchError from "./CocktailFetchError";

export default class CocktailRepository implements ICocktailRepository {
  constructor(private client: ICocktailClient) {
    //
  }

  async getAll(): Promise<CocktailDTO[]> {
    try {
      const response = await this.client.getCocktails();
      return response.map((data) => CocktailDTO.fromResponse(data));
    } catch (e) {
      throw new CocktailFetchError({ cause: e });
    }
  }
}
