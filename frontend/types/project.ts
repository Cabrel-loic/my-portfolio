/** Domain types aligned with Django Project API. */

export type ProjectStatus = "completed" | "in_progress" | "planned";

export interface Technology {
  slug: string;
  name: string;
  category: string;
}

export interface ProjectImage {
  id: number;
  url: string;
  caption: string;
  order: number;
}

export interface ProjectListItem {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  status: ProjectStatus;
  technologies: Technology[];
  thumbnail: string | null;
  live_demo_url: string;
  source_code_url: string;
  created_at: string;
}

export interface ProjectDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  problem_statement: string;
  key_features: string[];
  my_role: string;
  technical_challenges_solutions: Array<{ challenge: string; solution: string }>;
  architectural_overview: Record<string, string | Array<{ name: string; description: string }>>;
  future_enhancements: string[];
  live_demo_url: string;
  source_code_url: string;
  status: ProjectStatus;
  technologies: Technology[];
  images: ProjectImage[];
  created_at: string;
  updated_at: string;
}

export interface ProjectsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProjectListItem[];
}

export type ProjectOrdering = "display" | "newest" | "oldest";

export interface ProjectFilters {
  status: ProjectStatus[];
  technologies: string[];
  ordering: ProjectOrdering;
}
