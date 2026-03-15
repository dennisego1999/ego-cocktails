"use client";

import { useState, useEffect } from "react";
import CocktailService from "@/app/classes/cocktail/CocktailService";
import CocktailDTO from "@/app/classes/cocktail/CocktailDTO";
import Section from "../../00_fundaments/section/section";
import Heading from "../../01_atoms/heading/heading";
import Text from "../../01_atoms/text/text";
import CocktailList from "../cocktail-list/cocktail-list";
import Button from "../../01_atoms/button/button";
import Loader from "../../01_atoms/loader/loader";

export default function SectionCocktailOverview() {
  const [cocktails, setCocktails] = useState<CocktailDTO[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);

  const limit = 10;

  async function fetchCocktailPage() {
    setIsFetching(true);

    try {
      const result = await CocktailService.instance.getPage(offset, limit);

      setCocktails((prev) => [...prev, ...result.cocktails]);
      setHasNext(result.hasNext ?? false);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  // Fetch first page on mount
  useEffect(() => {
    fetchCocktailPage();
  }, []);

  return (
    <Section
      className="section-cocktail-overview"
      padding="both"
      paddingSize="small"
      gutter="both"
      gap="tiny"
      theme="light"
    >
      <Heading>All cocktails</Heading>

      <Text>
        Every. Single. One. From the classic to the experimental, here's every cocktail ever mixed
        into one scrollable fever dream.
      </Text>

      {cocktails.length > 0 && <CocktailList cocktails={cocktails} />}

      {hasNext && !isFetching && <Button onClick={fetchCocktailPage}>Load more</Button>}

      {isFetching && cocktails.length > 0 && <Loader />}
    </Section>
  );
}
