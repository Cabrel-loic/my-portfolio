import type { ProjectFilters } from "@/types/project";

export const queryKeys = {
  projects: {
    all: ["projects"] as const,
    list: (filters: ProjectFilters, page: number) =>
      ["projects", "list", filters, page] as const,
    detail: (slug: string) => ["projects", "detail", slug] as const,
  },
};
