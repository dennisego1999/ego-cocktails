import HttpClient from "../clients/HttpClient";
import ICocktail from "./ICocktail";
import ICocktailClient from "./ICocktailClient";

export default class CocktailClient extends HttpClient implements ICocktailClient {
  constructor() {
    super("http://localhost:3000/api/");
  }

  getCocktails(): Promise<ICocktail[]> {
    return this.get<ICocktail[]>("cocktails");
  }
}
