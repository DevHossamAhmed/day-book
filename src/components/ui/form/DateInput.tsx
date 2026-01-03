import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type DateInputProps = {
  register?: UseFormRegisterReturn;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
};

export default function DateInput({
  register,
  error = false,
  disabled = false,
  className = "",
  value,
  onChange,
  min,
  max,
}: DateInputProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";

  return (
    <input
      type="date"
      {...register}
      disabled={disabled}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
    />
  );
}
