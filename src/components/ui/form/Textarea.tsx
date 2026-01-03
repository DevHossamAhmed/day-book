import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextareaProps = {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  register,
  placeholder,
  rows = 4,
  error = false,
  disabled = false,
  className = "",
  value,
  onChange,
}: TextareaProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";

  return (
    <textarea
      {...register}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={`${baseClasses} ${errorClasses} ${className}`}
    />
  );
}
