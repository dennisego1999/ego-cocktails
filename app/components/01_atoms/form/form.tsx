// app/components/01_atoms/form/form.tsx
"use client";

import FormProps from "./form-props";

export default function Form({ children, onSubmit, className, ...rest }: FormProps) {
  const classes = ["form", className].filter(Boolean).join(" ");

  return (
    <form className={classes} onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
}
