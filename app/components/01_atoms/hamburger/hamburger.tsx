"use client";

import HamburgerProps from "./hamburger-props";

export default function Hamburger({ className, ...props }: HamburgerProps) {
  const classes = ["hamburger", className].filter(Boolean).join(" ");

  return (
    <button className={classes} aria-label="Toggle menu" {...props}>
      <div className="hamburger__inner">
        <div className="hamburger__center"></div>
      </div>
    </button>
  );
}
