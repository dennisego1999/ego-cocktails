import { Metadata } from "next";
import Section from "./components/00_fundaments/section/section";
import Button from "./components/01_atoms/button/button";
import Heading from "./components/01_atoms/heading/heading";
import Text from "./components/01_atoms/text/text";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, we can't find the page you were looking for.",
};

export default function NotFound() {
  return (
    <Section gutter="both" padding="both" theme="light" gap="tiny">
      <Section>
        <Heading>404 - Page not found</Heading>

        <Text>Sorry, we can't find the page you were looking for.</Text>
      </Section>

      <Button href="/">Go back to home page</Button>
    </Section>
  );
}
