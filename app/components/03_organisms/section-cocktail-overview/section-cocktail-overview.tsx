"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CocktailService from "@/app/classes/cocktail/CocktailService";
import CocktailDTO from "@/app/classes/cocktail/CocktailDTO";
import Section from "../../00_fundaments/section/section";
import Heading from "../../01_atoms/heading/heading";
import Text from "../../01_atoms/text/text";
import CocktailList from "../cocktail-list/cocktail-list";
import Button from "../../01_atoms/button/button";
import Loader from "../../01_atoms/loader/loader";
import SearchBar from "../search-bar/search-bar";
import Error from "../../01_atoms/error/error";
import SectionCocktailOverviewProps from "./section-cocktail-overview-props";
import CocktailSearchError from "@/app/classes/cocktail/CocktailSearchError";

export default function SectionCocktailOverview({
  initialCocktails,
  initialHasNext,
  initialSearchQuery,
}: SectionCocktailOverviewProps) {
  const searchParams = useSearchParams();

  // Two result arrays initialized with server-fetched data
  const [pageResults, setPageResults] = useState<CocktailDTO[]>(initialCocktails);
  const [displayedResults, setDisplayedResults] = useState<CocktailDTO[]>(initialCocktails);

  const [hasNext, setHasNext] = useState(initialHasNext);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(10); // Start at 10 since we already have first page
  const [searchQuery, setSearchQuery] = useState<string | null>(initialSearchQuery || null);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const limit = 10;

  /** Load next page of cocktails */
  async function fetchCocktailPage(): Promise<void> {
    setIsFetching(true);

    try {
      const result = await CocktailService.instance.getPage(offset, limit);

      // Add new cocktails to page results list
      setPageResults((prev) => [...prev, ...result.cocktails]);

      // Add the new cocktails to the display results
      setDisplayedResults((prev) => [...prev, ...result.cocktails]);

      setHasNext(result.hasNext ?? false);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }

  /**
   * Search cocktails by name
   */
  async function performSearch(query: string | null): Promise<void> {
    if (!query) {
      // Clear search: show all loaded cocktails
      setDisplayedResults(pageResults);
      setIsSearchError(false);
      setSearchQuery(null);
      return;
    }

    setSearchQuery(query);

    // First check page results
    const localMatches = pageResults.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(query.toLowerCase()),
    );

    if (localMatches.length > 0) {
      setDisplayedResults(localMatches);
      setIsSearchError(false);
      return;
    }

    // No matches in local data => search
    setIsFetching(true);
    setIsSearchError(false);

    try {
      const results = await CocktailService.instance.search(query);
      setDisplayedResults(results);
    } catch (error) {
      setIsSearchError(true);
      setDisplayedResults([]);

      if (error instanceof CocktailSearchError) {
        console.error(error);
      } else {
        throw error;
      }
    } finally {
      setIsFetching(false);
    }
  }

  /**
   * Handle search query from URL on initial page load
   */
  useEffect(() => {
    async function handleInitialLoad() {
      const query = searchParams.get("q");
      if (query) {
        await performSearch(query);
      }

      if (pageResults.length > 0) {
        setIsInitializing(false);
      }
    }

    handleInitialLoad();
  }, [pageResults]);

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

      <SearchBar onSubmit={performSearch} disabled={isFetching} />

      {displayedResults.length > 0 && <CocktailList cocktails={displayedResults} />}

      {isSearchError && !isFetching && searchQuery && (
        <Error>Failed to find a cocktail for '{searchQuery}'</Error>
      )}

      {!isFetching && searchQuery && displayedResults.length === 0 && !isSearchError && (
        <Text>
          No cocktails found matching <strong>'{searchQuery}'</strong>
        </Text>
      )}

      {hasNext && displayedResults.length > 0 && !isFetching && !searchQuery && !isInitializing && (
        <Button onClick={fetchCocktailPage}>Load more</Button>
      )}

      {isFetching && <Loader />}
    </Section>
  );
}
