import type { Metadata } from "next";
import "./globals.css";
import "./lib/bootstrap.ts";
import ClientBootstrap from "./lib/client-bootstrap";
import Header from "./components/03_organisms/header/header";
import SkipLink from "./components/01_atoms/skip-link/skip-link";

export const metadata: Metadata = {
  title: "Ego Cocktails",
  description: "A Full Stack headless next.js experiment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientBootstrap />

        <SkipLink />

        <Header />

        <main id="content">{children}</main>
      </body>
    </html>
  );
}
