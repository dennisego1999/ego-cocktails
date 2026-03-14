export default class InvalidCocktailError extends Error {
  constructor() {
    super("Invalid cocktail response");

    this.name = "InvalidCocktailError";
  }
}
