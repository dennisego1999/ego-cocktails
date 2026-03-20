"use client";

import { useState, useCallback } from "react";
import CocktailService from "@/app/classes/cocktail/CocktailService";
import CocktailDTO from "@/app/classes/cocktail/CocktailDTO";
import Section from "../../00_fundaments/section/section";
import Heading from "../../01_atoms/heading/heading";
import Text from "../../01_atoms/text/text";
import CocktailList from "../cocktail-list/cocktail-list";
import Button from "../../01_atoms/button/button";
import Loader from "../../01_atoms/loader/loader";
import Error from "../../01_atoms/error/error";
import SectionCocktailOverviewProps from "./section-cocktail-overview-props";
import CocktailSearchError from "@/app/classes/cocktail/CocktailSearchError";
import CocktailSearchBar from "../cocktail-search-bar/cocktail-search-bar";

export default function SectionCocktailOverview({
  initialCocktails,
  initialHasNext,
  initialSearchQuery,
}: SectionCocktailOverviewProps) {
  const [displayedResults, setDisplayedResults] = useState<CocktailDTO[]>(initialCocktails);
  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isFetching, setIsFetching] = useState(false);

  // Start at 10 because first page is fetched server‑side
  const [offset, setOffset] = useState(10);

  const [searchQuery, setSearchQuery] = useState<string | null>(initialSearchQuery || null);
  const [isSearchError, setIsSearchError] = useState(false);

  const limit = 10;

  /** Load next page of cocktails */
  const fetchCocktailPage = useCallback(async () => {
    setIsFetching(true);

    try {
      const result = await CocktailService.instance.getPage(offset, limit);

      setDisplayedResults((prev) => [...prev, ...result.cocktails]);
      setHasNext(result.hasNext ?? false);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [offset, limit]);

  /**
   * Search cocktails by name
   * This is called by the search bar whenever a search should happen.
   */
  const performSearch = useCallback(
    async (query: string | null) => {
      if (!query) {
        setIsFetching(true);

        try {
          const result = await CocktailService.instance.getPage(0, limit);

          setDisplayedResults(result.cocktails);
          setHasNext(result.hasNext ?? false);

          // Next page offset = limit
          setOffset(limit);

          setIsSearchError(false);
          setSearchQuery(null);
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetching(false);
        }

        return;
      }

      setIsFetching(true);
      setIsSearchError(false);
      setSearchQuery(query);

      try {
        const searchResults = await CocktailService.instance.search(query);

        setDisplayedResults(searchResults);
      } catch (error) {
        setIsSearchError(true);

        if (error instanceof CocktailSearchError) {
          console.error(error);
          return;
        }

        throw error;
      } finally {
        setIsFetching(false);
      }
    },
    [limit],
  );

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
        All the drinks. Every. Single. One. From sophisticated sips to questionable concoctions.
      </Text>

      <CocktailSearchBar
        placeholder="Find a cocktail"
        onSubmit={performSearch}
        disabled={isFetching}
      />

      {displayedResults.length > 0 && <CocktailList cocktails={displayedResults} />}

      {isSearchError && !isFetching && searchQuery && (
        <Error>Failed to find a cocktail for '{searchQuery}'</Error>
      )}

      {!isFetching && searchQuery && displayedResults.length === 0 && !isSearchError && (
        <Text>
          No cocktails found matching <strong>'{searchQuery}'</strong>
        </Text>
      )}

      {hasNext && displayedResults.length > 0 && !isFetching && !searchQuery && (
        <Button onClick={fetchCocktailPage}>Load more</Button>
      )}

      {isFetching && <Loader />}
    </Section>
  );
}
