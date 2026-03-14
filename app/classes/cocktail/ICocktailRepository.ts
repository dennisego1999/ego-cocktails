import CocktailDTO from "./CocktailDTO";

export default interface ICocktailRepository {
  getAll(): Promise<CocktailDTO[]>;
}
