"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect, useMemo, FormEvent, ChangeEvent } from "react";
import debounce from "lodash/debounce";
import Section from "../../00_fundaments/section/section";
import InputField from "../../01_atoms/input-field/input-field";
import SearchBarProps from "./search-bar-props";
import Form from "../../01_atoms/form/form";
import ClickableList from "../../02_molecules/clickable-list/clickable-list";
import CocktailService from "@/app/classes/cocktail/CocktailService";

const SUGGESTION_MIN_LENGTH = 1;

export default function SearchBar({ onSubmit, disabled, placeholder }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionListRef = useRef<HTMLUListElement>(null);
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState<Array<{ name: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const justSelected = useRef(false);

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

  const debouncedUpdate = useMemo(
    () => debounce((value: string) => updateUrlAndSubmit(value), 300),
    [updateUrlAndSubmit],
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

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

        // Only show if we haven't just selected a suggestion
        if (!justSelected.current && results.length > 0) {
          setShowSuggestions(true);

          return;
        }

        setShowSuggestions(false);
      } catch (error) {
        console.error("Suggestions error", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const timer = setTimeout(fetchSuggestions, 150);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdate.cancel();
    updateUrlAndSubmit(inputValue || null);
    setTimeout(() => inputRef.current?.focus(), 50);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    justSelected.current = false;

    if (newValue === "") {
      debouncedUpdate.cancel();
      updateUrlAndSubmit(null);
      return;
    }

    debouncedUpdate(newValue);
  };

  const handleSuggestionClick = (name: string) => {
    setInputValue(name);
    setShowSuggestions(false);
    justSelected.current = true;
    debouncedUpdate.cancel();
    updateUrlAndSubmit(name);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isClickInside =
        inputRef.current?.contains(target) || suggestionListRef.current?.contains(target);
      if (!isClickInside) {
        setShowSuggestions(false);
      }
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
          <ClickableList
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
