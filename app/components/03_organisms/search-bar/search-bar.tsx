"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import Section from "../../00_fundaments/section/section";
import InputField from "../../01_atoms/input-field/input-field";
import SearchBarProps from "./search-bar-props";
import Form from "../../01_atoms/form/form";
import ClickableList from "../../02_molecules/clickable-list/clickable-list";
import CocktailService from "@/app/classes/cocktail/CocktailService";
import ICocktailSuggestion from "@/app/classes/cocktail/ICocktailSuggestion";

const SUGGESTION_MIN_LENGTH = 1;
const SUGGESTION_DEBOUNCE = 150;
const FOCUS_DELAY = 50;

export default function SearchBar({ onSubmit, disabled, placeholder }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<Array<ICocktailSuggestion>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Memoized function to focus input and place cursor at the end
  const focusInputEnd = useCallback(() => {
    const input = inputRef.current;
    if (input) {
      input.focus();
      const len = input.value.length;

      // Move cursor to end
      input.setSelectionRange(len, len);
    }
  }, []);

  // After URL changes
  useEffect(() => {
    const timer = setTimeout(focusInputEnd, FOCUS_DELAY);
    return () => clearTimeout(timer);
  }, [searchParams, focusInputEnd]);

  // Update URL and notify parent of search query change
  const updateUrlAndSubmit = useCallback(
    (value: string | null) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      onSubmit(value);
    },
    [searchParams, pathname, router, onSubmit],
  );

  // Debounced version of updateUrlAndSubmit for live search as user types
  const debouncedUpdate = useMemo(
    () => debounce((value: string) => updateUrlAndSubmit(value), 300),
    [updateUrlAndSubmit],
  );

  // Cleanup debounce on unmount
  useEffect(() => debouncedUpdate.cancel, [debouncedUpdate]);

  // Fetch suggestions from the service when inputValue changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length < SUGGESTION_MIN_LENGTH) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const results = await CocktailService.instance.getSuggestions(inputValue);
        setSuggestions(results);
        setShowSuggestions(results.length !== 1);
      } catch (error) {
        console.error("Suggestions error", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, SUGGESTION_DEBOUNCE);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdate.cancel();

    updateUrlAndSubmit(inputValue || null);

    // Hide suggestions after submit
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      debouncedUpdate.cancel();

      // Clear search immediately
      updateUrlAndSubmit(null);

      return;
    }

    // Trigger debounced search
    debouncedUpdate(newValue);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setShowSuggestions(false);

    // Cancel any pending search
    debouncedUpdate.cancel();

    // Trigger search immediately
    updateUrlAndSubmit(name);
  };

  // Close suggestions when clicking outside the input or list
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isClickInside =
        inputRef.current?.contains(target) || suggestionListRef.current?.contains(target);
      if (!isClickInside) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Form className="search-bar" onSubmit={handleSubmit}>
      <Section className="search-bar__inner" flexDirection="row" align="center" gap="tiny">
        <InputField
          ref={inputRef}
          id="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          data-border-radius="small"
          autoComplete="search"
          type="search"
        />

        {showSuggestions && (
          <ClickableList<ICocktailSuggestion>
            ref={suggestionListRef}
            items={suggestions}
            renderItem={(item) => item.name}
            onItemClick={(item) => handleSuggestionClick(item.name)}
            keyExtractor={(item) => item.name}
          />
        )}
      </Section>
    </Form>
  );
}
