import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/03_organisms/navigation/navigation";

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
        <Navigation />

        <main>{children}</main>
      </body>
    </html>
  );
}
