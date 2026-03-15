import CocktailClient from "../classes/cocktail/CocktailClient";
import CocktailRepository from "../classes/cocktail/CocktailRepository";
import CocktailService from "../classes/cocktail/CocktailService";

// Bootstrap OOP layers for server components
const client = new CocktailClient();
const repo = new CocktailRepository(client);
CocktailService.init(repo);
