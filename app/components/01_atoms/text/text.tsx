import { HTMLTag } from "@/app/types/HtmlTag";
import React from "react";

interface TextProps {
  tag?: HTMLTag;
  fontSize?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  tag: Tag = "p",
  fontSize = "inherit",
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      className={`text${className ? ` ${className}` : ""}`}
      data-font-size={fontSize}
      {...rest}
    >
      {children}
    </Tag>
  );
}