"use client";

import { useRef, useEffect, useState } from "react";
import { ProjectsGrid } from "./ProjectsGrid";
import ParticleSystem from "@/components/hero/ParticleSystem";
import DataStreams from "@/components/hero/DataStreams";
import GridOverlay from "@/components/hero/GridOverlay";
import { Github } from "lucide-react";
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 relative scroll-mt-20 overflow-hidden"
    >
      {/* background layers for depth */}
      <ParticleSystem className="absolute inset-0 opacity-20 pointer-events-none" />
      <DataStreams className="absolute inset-0 opacity-30 pointer-events-none" />
      <GridOverlay className="absolute inset-0 opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={headingRef}
          className={cn(
            "text-center mb-16 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out-expo)]",
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            These projects tell the story of who I am as a developer &amp; designer—
            from polished UIs to robust backend systems. Browse, filter, and dive
            into the work that defines my craft.
          </p>
          <div className="mt-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-full shadow-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              See all on GitHub
            </a>
          </div>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
}
