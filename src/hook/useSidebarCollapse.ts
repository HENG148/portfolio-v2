"use client"

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sidebar:collapsed";

export function useSidebarCollapse(defaultCollapsed = false) {
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setCollapsed(stored === "true");
    } catch (_e) { }
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch (_e) { }
      return next;
    })
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "Input" || tag === "TEXTAREA") return;
      if (e.key === "[" && !e.metaKey && !e.ctrlKey) toggle();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler)
  }, [toggle]);
  return { collapsed, toggle };
}