import { InputHTMLAttributes } from "react";

type InputFieldProps = {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default InputFieldProps;
