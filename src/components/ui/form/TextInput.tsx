import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = {
  register?: UseFormRegisterReturn;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextInput({
  register,
  type = "text",
  placeholder,
  error = false,
  disabled = false,
  className = "",
  value,
  onChange,
}: TextInputProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";

  return (
    <input
      type={type}
      {...register}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
    />
  );
}
