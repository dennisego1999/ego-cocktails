"use client";

import { forwardRef } from "react";
import InputFieldProps from "./input-field-props";

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, placeholder, value, onChange, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className="input-field"
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
