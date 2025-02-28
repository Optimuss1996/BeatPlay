import { twMerge } from "tailwind-merge";

interface ChildrenProps {
  children: React.ReactNode;
  className?: string;
}
export default function Box({ children, className }: ChildrenProps) {
  return (
    <div
      className={twMerge(`bg-purple-100 w-full h-fit rounded-lg`, className)}
    >
      {children}
    </div>
  );
}
