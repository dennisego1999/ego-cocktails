declare namespace React {
  interface ButtonHTMLAttributes<T> {
    popovertarget?: string;
    popovertargetaction?: 'toggle' | 'show' | 'hide';
  }

  interface HTMLAttributes<T> {
    popover?: 'auto' | 'manual' | '';
  }
}