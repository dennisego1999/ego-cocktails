"use client";

import CocktailClient from "../classes/cocktail/CocktailClient";
import CocktailRepository from "../classes/cocktail/CocktailRepository";
import CocktailService from "../classes/cocktail/CocktailService";

// Bootstrap OOP layers for client components
const client = new CocktailClient();
const repo = new CocktailRepository(client);
CocktailService.init(repo);
