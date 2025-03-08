import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={twMerge(
          `
        w-full
        bg-purple-600
         rounded-full
         text-black
         font-semibold
         p-3
         disabled:cursor-not-allowed
         disabled:opacity-50
         hover:bg-purple-900
         transition
         border
         border-transparent
    `,
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
