"use client"

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "sidebar:collapsed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("sidebar-collapse", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("sidebar-collapse", callback);
  };
}

function readStored(): boolean | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === null ? null : raw === "true";
  } catch {
    return null;
  }
}

export function useSidebarCollapse(defaultCollapsed = false) {
  const getSnapshot = useCallback(
    () => readStored() ?? defaultCollapsed,
    [defaultCollapsed]
  );

  const collapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => defaultCollapsed
  );

  const setCollapsed = useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
    window.dispatchEvent(new Event("sidebar-collapse"));
  }, []);

  const toggle = useCallback(
    () => setCollapsed(!getSnapshot()),
    [setCollapsed, getSnapshot]
  );

  return { collapsed, setCollapsed, toggle };
}