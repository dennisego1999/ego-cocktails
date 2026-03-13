declare namespace React {
  interface ButtonHTMLAttributes {
    popovertarget?: string;
    popovertargetaction?: "toggle" | "show" | "hide";
  }

  interface HTMLAttributes {
    popover?: "auto" | "manual" | "";
  }
}
