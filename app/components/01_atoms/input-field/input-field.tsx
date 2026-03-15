"use client";

import InputFieldProps from "./input-field-props";

export default function InputField({
  id,
  placeholder,
  value,
  onChange,
  ...props
}: InputFieldProps) {
  return (
    <input
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
}
