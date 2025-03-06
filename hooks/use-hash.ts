"use client";
import { useEffect, useState } from 'react';

interface Section {
  id: string;
  element: HTMLElement;
}

export default function useHash(sectionIds: string[]): string {
  // Use an empty string as a safe initial value.
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const sections: Section[] = sectionIds
      .map((id) => {
        const element = document.getElementById(id.replace('#', ''));
        return element ? { id, element } : null;
      })
      .filter((s): s is Section => s !== null);

    if (sections.length === 0) return;

    // Use a lower threshold so we catch even small intersections.
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter entries that are intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Choose the entry with the smallest absolute top offset
          // (i.e. the one closest to the top of the viewport)
          const best = visibleEntries.reduce((prev, current) => {
            return Math.abs(prev.boundingClientRect.top) < Math.abs(current.boundingClientRect.top)
              ? prev
              : current;
          });
          setActiveSection(`#${best.target.id}`);
        }
      },
      { threshold: [0.3] }
    );

    sections.forEach((section) => {
      observer.observe(section.element);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section.element);
      });
    };
  }, [sectionIds]);

  return activeSection;
}



