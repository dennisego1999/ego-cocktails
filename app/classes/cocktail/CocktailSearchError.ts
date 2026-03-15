export default class CocktailSearchError extends Error {
  constructor(name: string) {
    super(`No cocktails found matching '${name}'`);

    this.name = "CocktailSearchError";
  }
}
