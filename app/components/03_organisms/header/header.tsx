"use client";

import { useState } from "react";
import Logo from "../../01_atoms/logo/logo";
import Section from "../../00_fundaments/section/section";
import Hamburger from "../../01_atoms/hamburger/hamburger";
import PopoverMenu from "../popover-menu/popover-menu";
import NavMenu from "../../02_molecules/nav-menu/nav-menu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="header-footprint" />

      <Section
        tag="header"
        className="header"
        flexDirection="row"
        justify="between"
        align="center"
        gap="tiny"
        gutter="both"
        theme="dark"
      >
        <Logo />

        <NavMenu className="navigation__links" aria-label="Desktop navigation" />

        <Hamburger popovertarget="mobile-nav" aria-controls="mobile-nav" aria-expanded={isOpen} />

        <PopoverMenu id="mobile-nav" onToggle={setIsOpen}>
          <NavMenu
            className="navigation__mobile-links"
            aria-label="Mobile navigation"
            isMobile={true}
          />
        </PopoverMenu>
      </Section>
    </>
  );
}
