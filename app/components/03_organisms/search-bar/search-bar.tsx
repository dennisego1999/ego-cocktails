"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useCallback, useEffect, FormEvent, ChangeEvent, useMemo } from "react";
import debounce from "lodash/debounce";
import Section from "../../00_fundaments/section/section";
import InputField from "../../01_atoms/input-field/input-field";
import SearchBarProps from "./search-bar-props";
import Form from "../../01_atoms/form/form";

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
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debouncedUpdate.cancel();
    updateUrlAndSubmit(inputValue || null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue === "") {
      debouncedUpdate.cancel();
      updateUrlAndSubmit(null);
    } else {
      debouncedUpdate(newValue);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [searchParams]);

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
