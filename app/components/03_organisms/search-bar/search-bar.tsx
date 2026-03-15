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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update URL without reload
    const params = new URLSearchParams(searchParams);
    if (inputValue) {
      params.set("q", inputValue);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    onSubmit(inputValue || null);
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
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          data-border-radius="small"
        />

        <Button type="submit" disabled={disabled}>
          Search
        </Button>
      </Section>
    </Form>
  );
}
