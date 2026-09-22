import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";

export interface CTA extends VariantProps<typeof buttonVariants>{
  label?: string;
  onClick?: () => void;
  href?: string;
}

export function CTAButton({ actions }: { actions: CTA[] }) {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {actions.map((act, i) => 
        act.href ? (
          <Button key={`${act.label}-${i}`} variant={act.variant}>
            <a href={act.href} target="_blank" rel="noopener noreferrer">
              {act.label}
            </a>
          </Button>
        ) : (
            <Button key={`${act.label}-${i}`} variant={act.variant} onClick={act.onClick}>
              {act.label}
            </Button>
      ))}
    </div>
  )
}