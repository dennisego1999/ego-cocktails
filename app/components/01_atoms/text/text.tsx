import React from "react";
import TextProps from "./text-props";

export default function Text({
  tag: Tag = "p",
  size = "inherit",
  className,
  children,
  ...rest
}: TextProps) {
  const classes = ["text", className].filter(Boolean).join(" ");

  return (
    <Tag className={classes} data-text-size={size} {...rest}>
      {children}
    </Tag>
  );
}
