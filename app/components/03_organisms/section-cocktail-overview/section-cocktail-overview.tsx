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
import CocktailFetchError from "@/app/classes/cocktail/CocktailFetchError";

export default function SectionCocktailOverview() {
  const searchParams = useSearchParams();

  // Two result arrays:
  // - pageResults: ALL cocktails loaded so far via "Load more" (grows over time)
  // - displayedResults: What the user actually sees (full list OR search results)
  const [pageResults, setPageResults] = useState<CocktailDTO[]>([]);
  const [displayedResults, setDisplayedResults] = useState<CocktailDTO[]>([]);

  const [hasNext, setHasNext] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [isSearchError, setIsSearchError] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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
   *
   * Two ways this gets called:
   * 1. User types + submits SearchBar → calls this directly
   * 2. Page loads with ?q=... in URL → useEffect calls this after data loads
   *
   * Why no duplicate searches?
   * - Search only updates displayedResults, NOT pageResults
   * - The useEffect below only triggers when pageResults changes
   * - So manual searches don't trigger the effect => no duplicate
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

      if (error instanceof CocktailFetchError) {
        console.error(error);
      } else {
        throw error;
      }
    } finally {
      setIsFetching(false);
    }
  }

  // Initial load: fetch first page when component mounts
  useEffect(() => {
    fetchCocktailPage();
  }, []);

  /**
   * Handle search query from URL on initial page load
   *
   * Why this works without duplicates:
   * - Only runs when pageResults changes (new data loaded)
   * - Does NOT run when searchParams changes
   * - Manual searches via SearchBar call performSearch directly
   * - So URL param only triggers search ONCE when page first loads
   */
  useEffect(() => {
    async function handleInitialLoad() {
      const query = searchParams.get("q");

      if (query && pageResults.length > 0) {
        await performSearch(query);
      }

      if (pageResults.length > 0) {
        setIsInitialLoading(false);
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

      {displayedResults.length > 0 && !isInitialLoading && (
        <CocktailList cocktails={displayedResults} />
      )}

      {isSearchError && !isFetching && searchQuery && (
        <Error>Failed to find a cocktail for '{searchQuery}'</Error>
      )}

      {hasNext && displayedResults.length > 0 && !isFetching && !searchQuery && (
        <Button onClick={fetchCocktailPage}>Load more</Button>
      )}

      {isFetching && <Loader />}
    </Section>
  );
}
