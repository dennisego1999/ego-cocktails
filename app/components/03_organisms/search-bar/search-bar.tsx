"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Section from "../../00_fundaments/section/section";
import InputField from "../../01_atoms/input-field/input-field";
import SearchBarProps from "./search-bar-props";
import Form from "../../01_atoms/form/form";
import { useState, useRef, FormEvent, ChangeEvent } from "react";

export default function SearchBar({
  onSubmit,
  disabled = false,
  placeholder = "Search cocktails...",
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");
  const searchDebounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const updateUrlAndSubmit = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onSubmit(value);

    // Ensure input field stays focused
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
      searchDebounceTimeout.current = null;
    }
    updateUrlAndSubmit(inputValue || null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      if (searchDebounceTimeout.current) {
        clearTimeout(searchDebounceTimeout.current);
        searchDebounceTimeout.current = null;
      }
      updateUrlAndSubmit(null);
      return;
    }

    if (searchDebounceTimeout.current) {
      clearTimeout(searchDebounceTimeout.current);
    }
    searchDebounceTimeout.current = setTimeout(() => {
      updateUrlAndSubmit(newValue);
    }, 300);
  };

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
      </Section>
    </Form>
  );
}
