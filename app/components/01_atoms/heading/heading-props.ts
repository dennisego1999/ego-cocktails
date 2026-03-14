import { HTMLTag } from "@/app/types/html-tag";

type HeadingProps = {
  tag?: HTMLTag;
  size?: string;
  className?: string;
  children?: React.ReactNode;
};

export default HeadingProps;
