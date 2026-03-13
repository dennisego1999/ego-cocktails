"use client";

import PopoverMenuProps from "@/app/components/03_organisms/popover-menu/popover-menu-props";
import { useRef, useEffect } from "react";

export default function PopoverMenu({ id, children, onToggle }: PopoverMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(width >= 64rem)");

    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) el.hidePopover?.();
    };

    const handleLinkClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".navigation__mobile-links a")) {
        el.hidePopover?.();
      }
    };

    const handleToggle = (e: Event) => {
      onToggle?.((e as ToggleEvent).newState === "open");
    };

    mediaQuery.addEventListener("change", handleBreakpoint);
    el.addEventListener("click", handleLinkClick);
    el.addEventListener("toggle", handleToggle);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpoint);
      el.removeEventListener("click", handleLinkClick);
      el.removeEventListener("toggle", handleToggle);
    };
  }, [onToggle]);

  return (
    <div ref={ref} id={id} popover="auto" className="popover-menu">
      {children}
    </div>
  );
}
