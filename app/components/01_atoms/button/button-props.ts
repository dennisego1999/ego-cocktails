import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLElement> & {
  href?: string | null;
  external?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
};

export default ButtonProps;
