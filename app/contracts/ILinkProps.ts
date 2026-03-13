import { LinkProps } from "next/link";

export default interface ILinkProps extends LinkProps {
  children: React.ReactNode;
}