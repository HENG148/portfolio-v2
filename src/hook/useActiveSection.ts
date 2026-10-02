import { useCallback, useEffect, useRef, useState } from "react";
import { SectionId } from "../features/sidebar/type";

const SECTION_IDS: SectionId[] = [
  "home", "about", "experience", "educations", "projects", "blog", "skills", "contact"
];

function updateUrl(id: SectionId) {
  const url = id === "home"
    ? window.location.pathname + window.location.search
    : `#${id}`;
  history.replaceState(null, "", url);
}

export function useActiveSection(
  externalActive?: SectionId
): readonly [SectionId, (id: SectionId) => void] {
  const [active, setActive] = useState<SectionId>(externalActive ?? "home");
  const clickLockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const elements = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          setActive(id);
          updateUrl(id);
        }
      },
      { threshold: [0.3, 0.6], rootMargin: "-10% 0px -10% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const setActiveSection = useCallback((id: SectionId) => {
    clickLockRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      clickLockRef.current = false;
    }, 1000);

    setActive(id);
    updateUrl(id);
  }, []);

  return [active, setActiveSection] as const;
}