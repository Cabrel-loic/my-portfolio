"use client";

import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { projectsService } from "@/lib/services/projects";
import type { ProjectFilters } from "@/types/project";

const PAGE_SIZE = 12;

export function useProjectsQuery(filters: ProjectFilters, page: number) {
  return useQuery({
    queryKey: queryKeys.projects.list(filters, page),
    queryFn: () => projectsService.list(filters, page),
    placeholderData: keepPreviousData,
  });
}

export function useProjectsInfiniteQuery(filters: ProjectFilters) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.projects.all, "infinite", filters],
    queryFn: ({ pageParam }) =>
      projectsService.list(filters, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (last, allPages) =>
      last.next && last.results.length >= PAGE_SIZE ? allPages.length + 1 : undefined,
  });
}

export function useProjectDetailQuery(slug: string | null) {
  return useQuery({
    queryKey: queryKeys.projects.detail(slug ?? ""),
    queryFn: () => projectsService.getBySlug(slug!),
    enabled: !!slug,
  });
}
