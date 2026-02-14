"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardGlowProps {
  children: ReactNode;
  className?: string;
  href?: string;
}

export function CardGlow({ children, className, href }: CardGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--project-glow-x", `${x}%`);
    el.style.setProperty("--project-glow-y", `${y}%`);
    el.style.setProperty("--project-glow-opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    ref.current?.style.setProperty("--project-glow-opacity", "0");
  }, []);

  const card = (
    <div
      ref={ref}
      className={cn(
        "project-card",
        "relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-quart)]",
        "hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:border-purple-200",
        "project-card-glow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:transition-opacity before:duration-300",
        "will-change: transform",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded-2xl"
      >
        {card}
      </a>
    );
  }

  return card;
}
