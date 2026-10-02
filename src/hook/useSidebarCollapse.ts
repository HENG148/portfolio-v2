"use client"

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "sidebar:collapsed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("sidebar-collapse", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sidebar-collapse", callback);
  }
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false
  }
}

export function useSidebarCollapse() {
  const collapsed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  const setCollapsed = useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
    window.dispatchEvent(new Event("sidebar-collapse"));
  }, []);

  const toggle = useCallback(() => setCollapsed(!getSnapshot()), [setCollapsed]);

  return { collapsed, setCollapsed, toggle };
}