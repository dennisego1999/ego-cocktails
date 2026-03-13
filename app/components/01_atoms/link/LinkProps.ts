import { LinkProps } from "next/link";

type LinkPropsExtended = LinkProps & {
  children: React.ReactNode;
};

export default LinkPropsExtended;