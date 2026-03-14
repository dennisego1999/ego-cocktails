import { HTMLTag } from "@/app/types/html-tag";

type TextProps = {
  tag?: HTMLTag;
  size?: string;
  className?: string;
  children?: React.ReactNode;
};

export default TextProps;
