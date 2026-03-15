"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Section from "../../00_fundaments/section/section";
import InputField from "../../01_atoms/input-field/input-field";
import Button from "../../01_atoms/button/button";
import SearchBarProps from "./search-bar-props";
import Form from "../../01_atoms/form/form";
import { useState } from "react";

export default function SearchBar({
  onSubmit,
  disabled = false,
  placeholder = "Search cocktails...",
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useState(searchParams.get("q") || "");

  const updateUrlAndSubmit = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onSubmit(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUrlAndSubmit(inputValue || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // If input is cleared (native X button clicked), update URL immediately
    if (newValue === "") {
      updateUrlAndSubmit(null);
    }
  };

  return (
    <Form className="search-bar" onSubmit={handleSubmit}>
      <Section
        className="search-bar__inner"
        flexDirection="row"
        justify="between"
        align="center"
        gap="tiny"
      >
        <InputField
          id="search"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          disabled={disabled}
          data-border-radius="small"
          autoComplete="search"
          type="search"
        />

        <Button type="submit" disabled={disabled}>
          Search
        </Button>
      </Section>
    </Form>
  );
}
