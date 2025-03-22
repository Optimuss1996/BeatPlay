import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, disabled, type = "input", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={twMerge(
          `
     w-full
     mx-auto
     p-3
     rounded-md
     bg-purple-300
      dark:bg-slate-800/60
     border
     border-transparent
     text-sm
     file:border-0
     file:bg-transparent
     file:text-sm
     file:font-medium
     disabled:cursor-not-allowed
     disabled:opacity-50
     focus:outline-none

      `,
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
