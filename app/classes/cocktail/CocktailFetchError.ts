export default class CocktailFetchError extends Error {
  constructor(options?: { cause?: unknown }) {
    super("Failed to fetch cocktails", options);
    this.name = "CocktailFetchError";
  }
}
