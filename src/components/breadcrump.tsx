"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useMemo } from "react";

interface BreadcrumbProps {
  postTitle?: string;
}

function slugToLabel(slug: string): string {
  return decodeURIComponent(slug)
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function BreadCrumb({ postTitle }: BreadcrumbProps) {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    const segments = (pathname ?? "").split("/").filter(Boolean);
    return segments.map((segment, i) => {
      const isLast = i === segments.length - 1;
      return {
        path: "/" + segments.slice(0, i + 1).join("/"),
        label: isLast && postTitle ? postTitle : slugToLabel(segment),
        isLast,
      };
    });
  }, [pathname, postTitle]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5">
      <Link
        href="/"
        className="font-mono text-[14px] text-[#555] transition-colors hover:text-white"
      >
        Home
      </Link>

      {crumbs.map((crumb) => (
        <Fragment key={crumb.path}>
          <span className="font-mono text-[11px] text-[#333]">/</span>
          {crumb.isLast ? (
            <span
              aria-current="page"
              className="max-w-80 truncate font-mono text-[14px] text-[#888]"
            >
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.path}
              className="font-mono text-[14px] text-[#555] transition-colors hover:text-white"
            >
              {crumb.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}