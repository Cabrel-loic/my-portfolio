import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";
import Navigation from "@/components/Navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <ProjectDetailPage slug={slug} />
    </div>
  );
}
