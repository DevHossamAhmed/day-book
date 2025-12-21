import React from "react";
import { ChevronDown } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = {
  register?: UseFormRegisterReturn;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  register,
  options,
  placeholder = "Select an option",
  error = false,
  disabled = false,
  isLoading = false,
  className = "",
  value,
  onChange,
}: SelectProps) {
  const baseClasses =
    "w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const errorClasses = error ? "border-red-300" : "border-gray-300";
  const disabledClasses =
    disabled || isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white";

  return (
    <div className="relative">
      <select
        {...register}
        disabled={disabled || isLoading}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      >
        <option value="">
          {isLoading ? "Loading..." : placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
}
