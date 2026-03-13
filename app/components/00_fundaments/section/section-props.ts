import { HTMLTag } from "@/app/types/html-tag";
import { ReactNode, AriaAttributes } from "react";

type SectionProps = AriaAttributes & {
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
  role?: string;
};

export default SectionProps;
