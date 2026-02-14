import api from "../api";
import type {
  ProjectDetail,
  ProjectsListResponse,
  ProjectFilters,
} from "@/types/project";

const BASE = "/api/projects";

function buildParams(filters: ProjectFilters): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  if (filters.status.length) params.status = filters.status;
  if (filters.technologies.length) params.technologies = filters.technologies.join(",");
  if (filters.ordering) params.ordering = filters.ordering;
  return params;
}

export const projectsService = {
  async list(
    filters: ProjectFilters,
    page = 1
  ): Promise<ProjectsListResponse> {
    const { data } = await api.get<ProjectsListResponse>(BASE + "/", {
      params: { ...buildParams(filters), page },
    });
    return data;
  },

  async getBySlug(slug: string): Promise<ProjectDetail> {
    const { data } = await api.get<ProjectDetail>(`${BASE}/${encodeURIComponent(slug)}/`);
    return data;
  },
};
