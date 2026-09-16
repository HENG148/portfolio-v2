import { useCallback, useEffect, useRef, useState } from "react";
import { SectionId } from "../features/sidebar/type";

const SECTION_IDS: SectionId[] = [
  "home", "about", "experience", "educations", "projects", "blog", "skills", "contact"
]

export function useActiveSection(externalActive?: SectionId): readonly [SectionId, (id: SectionId) => void]{
  const [active, setActive] = useState<SectionId>(externalActive ?? "home");
  const clickLockRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const elements = SECTION_IDS
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (elements.length === 0) return
    
    const observer = new IntersectionObserver(
      entries => {
        if (clickLockRef.current) return
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        
        if (visible.length > 0) {
          setActive(visible[0].target.id as SectionId)
        }
      },
      { threshold: [0.3, 0.6], rootMargin: "-10% 0px -10% 0px"}
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect();
  }, [])

  const setActiveSection = useCallback((id: SectionId) => {
    clickLockRef.current = true
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      clickLockRef.current = false
    }, 800)
    setActive(id)
  }, [])
  return [active, setActiveSection]
}