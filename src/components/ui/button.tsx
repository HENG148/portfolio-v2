import { cn } from "@/src/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "px-8 py-3.5 text-sm font-semibold tracking-widest uppercase rounded-full transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-white text-black hover:bg-netural-200",
        outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black",
      }
    },
    defaultVariants: {
      variant: "primary",
    }
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants>{ }

export function Button({ className, variant, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)}{...props}>
      {children}
    </button>
  )
}