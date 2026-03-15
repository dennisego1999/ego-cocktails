import HttpClient from "../clients/HttpClient";
import ICocktail from "./ICocktail";
import ICocktailClient from "./ICocktailClient";

export default class CocktailClient extends HttpClient implements ICocktailClient {
  constructor() {
    super("http://localhost:3000/api/");
  }

  async getCocktails(
    offset?: number,
    limit?: number,
  ): Promise<{ cocktails: ICocktail[]; hasNext: boolean }> {
    const params = new URLSearchParams();

    if (offset !== undefined) {
      params.append("offset", offset.toString());
    }

    if (limit !== undefined) {
      params.append("limit", limit.toString());
    }

    return this.get<{ cocktails: ICocktail[]; hasNext: boolean }>(`cocktails/all?${params}`);
  }

  async getPopular(limit: number = 5): Promise<ICocktail[]> {
    const params = new URLSearchParams();

    if (limit !== undefined) {
      params.append("limit", limit.toString());
    }

    return this.get<ICocktail[]>(`cocktails/popular?${params}`);
  }
}
