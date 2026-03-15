"use client";

import { useEffect } from "react";
import CocktailClient from "../classes/cocktail/CocktailClient";
import CocktailRepository from "../classes/cocktail/CocktailRepository";
import CocktailService from "../classes/cocktail/CocktailService";

export default function ClientBootstrap() {
  useEffect(() => {
    // Bootstrap OOP layers for client components
    const client = new CocktailClient();
    const repo = new CocktailRepository(client);
    CocktailService.init(repo);
  }, []);

  return null;
}
