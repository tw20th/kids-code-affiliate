import React from "react";
import { cn } from "@/lib/utils"; // Tailwindのクラス結合関数（なければ除いてOK）

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "danger";
  loading?: boolean;
}

export const Button = ({
  className,
  variant = "default",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const baseStyle = "px-4 py-2 text-sm font-medium rounded-xl transition";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={cn(
        baseStyle,
        variants[variant],
        isDisabled && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? "読み込み中..." : children}
    </button>
  );
};

export default Button;
