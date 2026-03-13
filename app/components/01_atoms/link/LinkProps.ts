import { LinkProps } from "next/link";

type LinkPropsExtended = LinkProps & {
  className?: string;
  children: React.ReactNode;
};

export default LinkPropsExtended;
