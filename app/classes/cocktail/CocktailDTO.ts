import ICocktail from "./ICocktail";
import ICocktailIngredient from "./ICocktailIngredient";
import InvalidCocktailError from "./InvalidCocktailError";

export default class CocktailDTO {
  constructor(
    public readonly name: string,
    public readonly glass: string,
    public readonly category: string | null,
    public readonly popularity: number,
    public readonly ingredients: ICocktailIngredient[],
    public readonly garnish: string | null,
    public readonly preparation: string | null,
  ) {
    //
  }

  static fromResponse(data: ICocktail): CocktailDTO {
    if (!CocktailDTO.isValid(data)) {
      throw new InvalidCocktailError();
    }

    return new CocktailDTO(
      data.name,
      data.glass,
      data.category ?? null,
      data.popularity ?? null,
      data.ingredients.map((i) => ({
        unit: i.unit ?? null,
        amount: i.amount ?? null,
        ingredient: i.ingredient ?? null,
        label: i.label ?? null,
        special: i.special ?? undefined,
      })),
      data.garnish ?? null,
      data.preparation ?? null,
    );
  }

  private static isValid(data: unknown): data is ICocktail {
    return (
      typeof data === "object" &&
      data !== null &&
      typeof (data as ICocktail).name === "string" &&
      typeof (data as ICocktail).glass === "string" &&
      ((data as ICocktail).category === undefined ||
        typeof (data as ICocktail).category === "string") &&
      ((data as ICocktail).popularity === undefined ||
        typeof (data as ICocktail).popularity === "number") &&
      Array.isArray((data as ICocktail).ingredients) &&
      (data as ICocktail).ingredients.every(
        (i) =>
          typeof i === "object" &&
          i !== null &&
          (i.special !== undefined || i.ingredient !== undefined),
      ) &&
      ((data as ICocktail).garnish === undefined ||
        typeof (data as ICocktail).garnish === "string") &&
      ((data as ICocktail).preparation === undefined ||
        typeof (data as ICocktail).preparation === "string")
    );
  }
}
