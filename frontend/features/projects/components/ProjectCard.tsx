"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { CardGlow } from "@/components/ui/CardGlow";
import type { ProjectListItem } from "@/types/project";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  planned: "Planned",
};

const STATUS_STYLES: Record<string, string> = {
  completed:
    "bg-emerald-500/15 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300",
  in_progress:
    "bg-amber-500/15 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300",
  planned:
    "bg-slate-500/15 text-slate-600 border-slate-200 dark:bg-slate-500/20 dark:text-slate-300",
};

interface ProjectCardProps {
  project: ProjectListItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = Math.min(index * 80, 400);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-out-expo)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        reducedMotion && "opacity-100 translate-y-0"
      )}
      style={!reducedMotion ? { transitionDelay: `${delay}ms` } : undefined}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-2xl"
      >
        <CardGlow>
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-100">
          {project.thumbnail ? (
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
              unoptimized={project.thumbnail.startsWith("http://127.0.0.1") || project.thumbnail.startsWith("http://localhost")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 text-gray-400">
              <span className="text-sm font-medium">No image</span>
            </div>
          )}
          <span
            className={cn(
              "absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full border",
              STATUS_STYLES[project.status] ?? STATUS_STYLES.planned
            )}
          >
            {STATUS_LABELS[project.status] ?? project.status}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {project.short_description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 5).map((t) => (
              <span
                key={t.slug}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            {project.source_code_url && (
              <a
                href={project.source_code_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </CardGlow>
      </Link>
    </div>
  );
}
