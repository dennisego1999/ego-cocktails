"use client";

import { usePathname } from "next/navigation";
import NavMenuProps from "@/app/components/02_molecules/nav-menu/nav-menu-props";
import Link from "../../01_atoms/link/link";
import Section from "../../00_fundaments/section/section";

const links = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "All recipes" },
];

export default function NavMenu({
  className,
  isMobile = false,
  "aria-label": ariaLabel,
  ...rest
}: NavMenuProps) {
  const pathname = usePathname();
  const classes = ["nav-menu", className].filter(Boolean).join(" ");

  const list = (
    <Section
      tag="ul"
      className={classes}
      flexDirection={isMobile ? "column" : "row"}
      justify={!isMobile ? "end" : "start"}
      gap="tiny"
      gutter={isMobile ? "both" : null}
      padding={isMobile ? "both" : null}
      paddingSize={isMobile ? "tiny" : null}
      {...rest}
    >
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} aria-current={pathname === href ? "page" : undefined}>
            {label}
          </Link>
        </li>
      ))}
    </Section>
  );

  if (ariaLabel) {
    return <nav aria-label={ariaLabel}>{list}</nav>;
  }

  return list;
}
