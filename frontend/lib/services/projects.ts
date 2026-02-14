import api from "../api";
import type {
  ProjectDetail,
  ProjectsListResponse,
  ProjectFilters,
} from "@/types/project";

const BASE = "/api/projects";

export const projectsService = {
  async list(
    filters: ProjectFilters,
    page = 1
  ): Promise<ProjectsListResponse> {
    // Build URL with repeated status params for Django's getlist()
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
    params.set("page", String(page));

    const queryString = params.toString();
    const url = queryString ? `${BASE}/?${queryString}` : `${BASE}/`;
    
    const { data } = await api.get<ProjectsListResponse>(url);
    return data;
  },

  async getBySlug(slug: string): Promise<ProjectDetail> {
    const { data } = await api.get<ProjectDetail>(`${BASE}/${encodeURIComponent(slug)}/`);
    return data;
  },
};
