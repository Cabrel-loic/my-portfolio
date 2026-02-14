"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { ProjectFilters, ProjectStatus, ProjectOrdering } from "@/types/project";

const STATUS_VALUES: ProjectStatus[] = ["completed", "in_progress", "planned"];
const ORDERING_VALUES: ProjectOrdering[] = ["display", "newest", "oldest"];

function parseStatus(s: string | null): ProjectStatus[] {
  if (!s) return [];
  const parts = s.split(",").map((p) => p.trim().toLowerCase());
  return parts.filter((p): p is ProjectStatus => STATUS_VALUES.includes(p as ProjectStatus));
}

function parseTechnologies(s: string | null): string[] {
  if (!s) return [];
  return s.split(",").map((p) => p.trim()).filter(Boolean);
}

function parseOrdering(s: string | null): ProjectOrdering {
  if (!s) return "display";
  const o = s.trim().toLowerCase() as ProjectOrdering;
  return ORDERING_VALUES.includes(o) ? o : "display";
}

export function useProjectFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: ProjectFilters = useMemo(
    () => ({
      status: parseStatus(searchParams.get("status")),
      technologies: parseTechnologies(searchParams.get("tech")),
      ordering: parseOrdering(searchParams.get("ordering")),
    }),
    [searchParams]
  );

  const setFilters = useCallback(
    (updater: (prev: ProjectFilters) => ProjectFilters) => {
      const next = updater(filters);
      const params = new URLSearchParams(searchParams.toString());
      if (next.status.length) params.set("status", next.status.join(","));
      else params.delete("status");
      if (next.technologies.length) params.set("tech", next.technologies.join(","));
      else params.delete("tech");
      if (next.ordering && next.ordering !== "display") params.set("ordering", next.ordering);
      else params.delete("ordering");
      const q = params.toString();
      router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
    },
    [filters, pathname, router, searchParams]
  );

  const toggleStatus = useCallback(
    (status: ProjectStatus) => {
      setFilters((prev) => ({
        ...prev,
        status: prev.status.includes(status)
          ? prev.status.filter((s) => s !== status)
          : [...prev.status, status],
      }));
    },
    [setFilters]
  );

  const toggleTechnology = useCallback(
    (slug: string) => {
      setFilters((prev) => ({
        ...prev,
        technologies: prev.technologies.includes(slug)
          ? prev.technologies.filter((t) => t !== slug)
          : [...prev.technologies, slug],
      }));
    },
    [setFilters]
  );

  const setOrdering = useCallback(
    (ordering: ProjectOrdering) => {
      setFilters((prev) => ({ ...prev, ordering }));
    },
    [setFilters]
  );

  return {
    filters,
    setFilters,
    toggleStatus,
    toggleTechnology,
    setOrdering,
  };
}
