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
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary-600)] focus:border-transparent transition-colors";
  const errorClasses = error
    ? "border-red-300"
    : "border-[var(--color-border)]";
  const disabledClasses = disabled
    ? "bg-[var(--color-gray-100)] cursor-not-allowed"
    : "bg-[var(--color-surface)]";

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
