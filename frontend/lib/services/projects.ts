import api from "../api";
import type {
  ProjectDetail,
  ProjectsListResponse,
  ProjectFilters,
} from "@/types/project";

const BASE = "/api/projects";

function buildParams(filters: ProjectFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.status.length) {
    filters.status.forEach((s) => params.append("status", s));
  }
  if (filters.technologies.length) {
    params.set("technologies", filters.technologies.join(","));
  }
  if (filters.ordering) {
    params.set("ordering", filters.ordering);
  }
  return params;
}

export const projectsService = {
  async list(
    filters: ProjectFilters,
    page = 1
  ): Promise<ProjectsListResponse> {
    const params = buildParams(filters);
    params.set("page", String(page));
    const url = BASE + "/" + (params.toString() ? `?${params.toString()}` : "");
    const { data } = await api.get<ProjectsListResponse>(url);
    return data;
  },

  async getBySlug(slug: string): Promise<ProjectDetail> {
    const { data } = await api.get<ProjectDetail>(`${BASE}/${encodeURIComponent(slug)}/`);
    return data;
  },
};
