import { HTMLTag } from "../types/HtmlTag";
import { ReactNode } from "react";

export default interface ISectionProps {
  tag?: HTMLTag;
  align?: string | null;
  justify?: string | null;
  size?: number | null;
  flexDirection?: string;
  gutter?: string | null;
  gutterSize?: string | null;
  padding?: string | null;
  paddingSize?: string | null;
  theme?: string | null;
  gap?: string | null;
  wrap?: boolean;
  className?: string;
  children?: ReactNode;
}