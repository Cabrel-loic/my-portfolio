"use client";

import { useProjectFilters } from "../hooks/use-project-filters";
import { useProjectsQuery } from "../hooks/use-projects-query";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import { FilterPills } from "./FilterPills";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { AlertCircle, RefreshCw } from "lucide-react";

export function ProjectsGrid() {
  const { filters } = useProjectFilters();
  const { data, isPending, isError, error, refetch } = useProjectsQuery(
    filters,
    1
  );
  const [isSuperuser, setIsSuperuser] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchMe() {
      try {
        const { data } = await api.get<{ is_superuser?: boolean }>(
          "/api/users/me/"
        );
        if (!mounted) return;
        setIsSuperuser(Boolean(data?.is_superuser));
      } catch (e) {
        // endpoint missing or unauthorized -> keep as not superuser
      }
    }
    fetchMe();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <FilterPills />
        {isSuperuser && (
          <div className="pt-2 sm:pt-0">
            <Button
              size="md"
              onClick={() => (window.location.href = "/admin/project/project/add/")}
            >
              Add Project
            </Button>
          </div>
        )}
      </div>

      {isPending && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          aria-busy="true"
          aria-label="Loading projects"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <div
          className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          role="alert"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-800 font-medium mb-2">
            {error instanceof Error ? error.message : "Failed to load projects"}
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      )}

      {!isPending && !isError && data && data.results.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center">
          <p className="text-gray-600 font-medium">No projects match the current filters.</p>
          <p className="text-sm text-gray-500 mt-1">Try adjusting status or sort.</p>
        </div>
      )}

      {!isPending && !isError && data && data.results.length > 0 && (
        <ul
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 list-none p-0 m-0"
          aria-label="Project list"
        >
          {data.results.map((project, index) => (
            <li key={project.id}>
              <ProjectCard project={project} index={index} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
