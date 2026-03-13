"use client"

import { useRef, useEffect } from "react";

export default function PopoverMenu({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const mediaQuery = window.matchMedia("(width >= 64rem)");

    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) {
        el.hidePopover?.();
      }
    };

    const handleLinkClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".navigation__mobile-links a")) {
        el.hidePopover?.();
      }
    };

    // Close popover when viewport reaches desktop breakpoint
    mediaQuery.addEventListener("change", handleBreakpoint);

    // Close popover when a mobile nav link is clicked
    el.addEventListener("click", handleLinkClick);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpoint);
      el.removeEventListener("click", handleLinkClick);
    };
  });

  return (
    <div ref={ref} id={id} popover="auto" aria-haspopup="menu" className="popover-menu">
      {children}
    </div>
  );
}