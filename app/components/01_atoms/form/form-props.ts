import { FormHTMLAttributes, ReactNode } from "react";

type FormProps = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
} & FormHTMLAttributes<HTMLFormElement>;

export default FormProps;
