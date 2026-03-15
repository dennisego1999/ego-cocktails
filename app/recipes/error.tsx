"use client";

import { useEffect } from "react";
import Section from "@/app/components/00_fundaments/section/section";
import Heading from "@/app/components/01_atoms/heading/heading";
import Text from "@/app/components/01_atoms/text/text";
import Button from "../components/01_atoms/button/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Page error:", error);
  }, [error]);

  return (
    <Section
      className="section-popular-cocktails"
      theme="light"
      padding="both"
      paddingSize="tiny"
      gutter="both"
      gap="tiny"
    >
      <Section>
        <Heading>All recipes</Heading>
        <Text>Unable to load cocktails right now. Please try again later.</Text>
      </Section>

      <Button onClick={reset}>Try again</Button>
    </Section>
  );
}
