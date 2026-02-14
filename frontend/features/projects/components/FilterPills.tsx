"use client";

import { useProjectFilters } from "../hooks/use-project-filters";
import type { ProjectStatus, ProjectOrdering } from "@/types/project";
import { cn } from "@/lib/utils";

const STATUS_PILLS: { value: ProjectStatus; label: string }[] = [
  { value: "completed", label: "Completed" },
  { value: "in_progress", label: "In Progress" },
  { value: "planned", label: "Planned" },
];

const ORDERING_PILLS: { value: ProjectOrdering; label: string }[] = [
  { value: "display", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export function FilterPills() {
  const { filters, toggleStatus, setOrdering, setFilters } = useProjectFilters();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-gray-500">Status</span>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilters(() => ({ status: [], technologies: [], ordering: "display" }))}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-quart)]",
            "border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2",
            filters.status.length === 0 && "project-filter-pill--active",
            filters.status.length === 0
              ? "border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30"
              : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
          )}
        >
          All
        </button>
        {STATUS_PILLS.map(({ value, label }) => {
          const active = filters.status.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggleStatus(value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-quart)]",
                "border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2",
                active && "project-filter-pill--active",
                active
                  ? "border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
      <span className="text-sm font-medium text-gray-500 ml-4">Sort</span>
      <div className="flex flex-wrap gap-2">
        {ORDERING_PILLS.map(({ value, label }) => {
          const active = filters.ordering === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setOrdering(value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-quart)]",
                "border-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-500 focus-visible:outline-offset-2",
                active && "project-filter-pill--active",
                active
                  ? "border-purple-500 bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                  : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50/50"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
