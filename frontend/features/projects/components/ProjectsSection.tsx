"use client";

import { useRef, useEffect, useState } from "react";
import { ProjectsGrid } from "./ProjectsGrid";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.location.hash !== "#projects") return;
    const el = sectionRef.current;
    if (!el) return;
    const t = requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headingRef}
          className={cn(
            "text-center mb-16 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out-expo)]",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="projects-heading-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A selection of work spanning full-stack development, UI/UX, and system design.
          </p>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
}
