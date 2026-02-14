"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Code2,
  Layers,
  Target,
  Sparkles,
} from "lucide-react";
import { useProjectDetailQuery } from "../hooks/use-projects-query";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/project";

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-emerald-500/15 text-emerald-700 border-emerald-200",
  in_progress: "bg-amber-500/15 text-amber-700 border-amber-200",
  planned: "bg-slate-500/15 text-slate-600 border-slate-200",
};

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return {
    className: cn(
      "project-detail-reveal",
      (visible || reducedMotion) && "is-visible"
    ),
  };
}

function ProjectDetailContent({ project }: { project: ProjectDetail }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLElement>(null);
  const challengesRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const futureRef = useRef<HTMLElement>(null);
  const revealHero = useReveal(heroRef);
  const revealArch = useReveal(archRef);
  const revealChallenges = useReveal(challengesRef);
  const revealFeatures = useReveal(featuresRef);
  const revealFuture = useReveal(futureRef);

  const arch = project.architectural_overview as Record<string, string> | undefined;
  const hasArch =
    arch &&
    (typeof arch.frontend === "string" ||
      typeof arch.backend === "string" ||
      typeof arch.database === "string" ||
      typeof arch.overview === "string");

  return (
    <article className="min-h-screen">
      <div className="project-detail-bar sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors focus-visible:outline focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-lg py-1"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            Back to projects
          </Link>
        </div>
      </div>

      <header
        ref={heroRef}
        className={cn("relative py-16 px-4 sm:px-6 overflow-hidden", revealHero.className)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50 -z-10" />
        <div className="max-w-4xl mx-auto">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-medium border mb-6",
              STATUS_STYLES[project.status] ?? STATUS_STYLES.planned
            )}
          >
            {project.status === "completed"
              ? "Completed"
              : project.status === "in_progress"
              ? "In Progress"
              : "Planned"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
              >
                <ExternalLink className="w-5 h-5" />
                Live demo
              </a>
            )}
            {project.source_code_url && (
              <a
                href={project.source_code_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                <Github className="w-5 h-5" />
                Source code
              </a>
            )}
          </div>
        </div>
      </header>

      {project.images && project.images.length > 0 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
            <div className="relative aspect-video w-full">
              <Image
                src={project.images[0].url}
                alt={project.images[0].caption || project.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                unoptimized={
                  project.images[0].url.startsWith("http://127.0.0.1") ||
                  project.images[0].url.startsWith("http://localhost")
                }
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        {project.problem_statement && (
          <section ref={featuresRef} className={revealFeatures.className}>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
              <Target className="w-6 h-6 text-purple-600" />
              Problem & context
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {project.problem_statement}
            </p>
          </section>
        )}

        {project.my_role && (
          <section className={revealFeatures.className}>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
              <Code2 className="w-6 h-6 text-purple-600" />
              My role
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {project.my_role}
            </p>
          </section>
        )}

        {project.key_features && project.key_features.length > 0 && (
          <section className={revealFeatures.className}>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
              Key features
            </h2>
            <ul className="space-y-2">
              {project.key_features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {hasArch && (
          <section ref={archRef} className={revealArch.className}>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
              <Layers className="w-6 h-6 text-purple-600" />
              Architecture
            </h2>
            <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/50 p-6">
              {arch.overview && (
                <p className="text-gray-600 leading-relaxed">{String(arch.overview)}</p>
              )}
              {arch.frontend && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Frontend</h3>
                  <p className="text-gray-600 text-sm">{arch.frontend}</p>
                </div>
              )}
              {arch.backend && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Backend</h3>
                  <p className="text-gray-600 text-sm">{arch.backend}</p>
                </div>
              )}
              {arch.database && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Database</h3>
                  <p className="text-gray-600 text-sm">{arch.database}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {project.technical_challenges_solutions &&
          project.technical_challenges_solutions.length > 0 && (
            <section ref={challengesRef} className={revealChallenges.className}>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Challenges & solutions
              </h2>
              <div className="space-y-6">
                {project.technical_challenges_solutions.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <p className="font-medium text-gray-900 mb-2">{item.challenge}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {project.future_enhancements && project.future_enhancements.length > 0 && (
          <section ref={futureRef} className={revealFuture.className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Future enhancements
            </h2>
            <ul className="space-y-2">
              {project.future_enhancements.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t.slug}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium text-sm"
              >
                {t.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export function ProjectDetailPage({ slug }: { slug: string }) {
  const { data, isPending, isError, error, refetch } = useProjectDetailQuery(slug);

  if (isPending) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Skeleton className="h-10 w-48 mb-12" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3 mb-12" />
          <Skeleton className="aspect-video w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">
            {error instanceof Error ? error.message : "Project not found"}
          </p>
          <Button onClick={() => refetch()}>Retry</Button>
          <button
            onClick={() => (window.location.href = "/#projects")}
            className="block mt-4 text-purple-600 hover:underline"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return <ProjectDetailContent project={data} />;
}
