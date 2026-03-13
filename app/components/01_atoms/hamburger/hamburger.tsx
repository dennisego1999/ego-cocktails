"use client";

import HamburgerProps from "./hamburger-props";

export default function Hamburger({ className, ...rest }: HamburgerProps) {
  const classes = ["hamburger", className].filter(Boolean).join(" ");

  return (
    <button className={classes} aria-label="Toggle menu" {...rest}>
      <div className="hamburger__inner">
        <div className="hamburger__center"></div>
      </div>
    </button>
  );
}
