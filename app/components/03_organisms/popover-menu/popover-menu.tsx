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

    const handleBreakpoint = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        el.hidePopover?.();
      }
    };

    mediaQuery.addEventListener("change", handleBreakpoint);

    return () => mediaQuery.removeEventListener("change", handleBreakpoint);
  });

  return (
    <div ref={ref} id={id} popover="auto" aria-haspopup="menu" className="popover-menu">
      {children}
    </div>
  );
}