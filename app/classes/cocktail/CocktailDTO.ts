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
      data.popularity,
      data.ingredients.map((i) => ({
        unit: i.unit ?? null,
        amount: i.amount ?? null,
        ingredient: i.ingredient ?? null,
        label: i.label ?? null,
        special: i.special ?? null,
      })),
      data.garnish ?? null,
      data.preparation ?? null,
    );
  }

  toJSON() {
    return {
      name: this.name,
      glass: this.glass,
      category: this.category,
      popularity: this.popularity,
      ingredients: this.ingredients,
      garnish: this.garnish,
      preparation: this.preparation,
    };
  }

  private static isValid(data: unknown): data is ICocktail {
    const cocktail = data as ICocktail;

    // Required fields
    if (
      typeof data !== "object" ||
      data === null ||
      typeof cocktail.name !== "string" ||
      typeof cocktail.glass !== "string" ||
      typeof cocktail.popularity !== "number" ||
      !Array.isArray(cocktail.ingredients)
    ) {
      return false;
    }

    // Check each ingredient is an object
    for (const ingredient of cocktail.ingredients) {
      if (typeof ingredient !== "object" || ingredient === null) return false;

      // If optional fields exist, their types must be correct
      if (
        (ingredient.unit !== undefined &&
          ingredient.unit !== null &&
          typeof ingredient.unit !== "string") ||
        (ingredient.amount !== undefined &&
          ingredient.amount !== null &&
          typeof ingredient.amount !== "number") ||
        (ingredient.ingredient !== undefined &&
          ingredient.ingredient !== null &&
          typeof ingredient.ingredient !== "string") ||
        (ingredient.label !== undefined &&
          ingredient.label !== null &&
          typeof ingredient.label !== "string") ||
        (ingredient.special !== undefined &&
          ingredient.special !== null &&
          typeof ingredient.special !== "string")
      ) {
        return false;
      }
    }

    // Optional cocktail fields - if they exist, must be strings
    if (
      (cocktail.category !== undefined &&
        cocktail.category !== null &&
        typeof cocktail.category !== "string") ||
      (cocktail.garnish !== undefined &&
        cocktail.garnish !== null &&
        typeof cocktail.garnish !== "string") ||
      (cocktail.preparation !== undefined &&
        cocktail.preparation !== null &&
        typeof cocktail.preparation !== "string")
    ) {
      return false;
    }

    return true;
  }
}
