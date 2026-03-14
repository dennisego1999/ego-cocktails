import React from "react";
import ButtonProps from "./button-props";
import Link from "../link/link";

export default function Button({
  disabled = false,
  href = null,
  external = false,
  onClick,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = ["button", disabled && "button--disabled", className].filter(Boolean).join(" ");

  if (href && external) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link className={classes} href={href} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
