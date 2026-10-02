import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./button";
import Link from "next/link";

export interface CTA extends VariantProps<typeof buttonVariants>{
  label?: string;
  onClick?: () => void;
  href?: string;
}

const isInternal = (href: string) => href.startsWith("#") || href.startsWith("/");

export function CTAButton({ actions }: { actions: CTA[] }) {
  return (
    <div className="flex flex-wrap gap-4 pt-2">
      {actions.map((act, i) => {
        const key = `${act.label}-${i}`
        if (act.href) {
          const className = buttonVariants({ variant: act.variant });
          if (isInternal(act.href)) {
            return (
              <Link key={key} href={act.href} className={className}>
                {act.label}
              </Link>
            )
          }
          return (
            <a key={key}
              href={act.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {act.label}
            </a>
          )
        }
        return (
          <Button key={key} variant={act.variant} onClick={act.onClick}>
            {act.label}
          </Button>
        )
      })}
    </div>
  )
}