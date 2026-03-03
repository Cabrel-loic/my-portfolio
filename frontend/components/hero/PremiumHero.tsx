"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import NeuralNetwork from "./NeuralNetwork";
import ParticleSystem from "./ParticleSystem";
import GridOverlay from "./GridOverlay";
import DataStreams from "./DataStreams";
import TypingEffect from "./TypingEffect";

interface MousePosition {
  x: number;
  y: number;
}

const PremiumHero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = contentRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const typingWords = [
    "Full-Stack Developer",
    "AI/ML Engineer",
    "Tech Architect",
  ];

  const parallaxX = (mousePosition.x - (window.innerWidth / 2)) * 0.02;
  const parallaxY = (mousePosition.y - (window.innerHeight / 2)) * 0.02;

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden bg-black/95"
      onMouseMove={handleMouseMove}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient backdrop */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-purple-950/20"
          style={{
            opacity: 0.7,
          }}
        />

        {/* Grid overlay */}
        <GridOverlay />

        {/* Animated background gradients */}
        <div
          className="absolute top-1/4 -left-1/3 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-3xl animate-blob"
          style={{
            animation: "blob 8s infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/3 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl animate-blob"
          style={{
            animation: "blob 8s infinite 2s",
          }}
        />

        {/* Neural Network */}
        <NeuralNetwork />

        {/* Particle System */}
        <ParticleSystem />

        {/* Data Streams */}
        <DataStreams />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
            {/* Left Content */}
            <div className={`space-y-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {/* Badge */}
              <div className="inline-block group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
                <div className="relative px-4 py-2 bg-black rounded-full border border-cyan-500/30 group-hover:border-cyan-500/60 transition">
                  <p className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    Available for Projects
                  </p>
                </div>
              </div>

              {/* Intro Text */}
              <div className="space-y-4">
                <h2 className="text-lg sm:text-xl text-gray-400">
                  Hi, I build intelligent digital systems
                </h2>

                {/* Typing Effect */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block">I am a</span>
                  {mounted && (
                    <TypingEffect
                      words={typingWords}
                      className="block font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                      speed={80}
                      deleteSpeed={40}
                      delayBetweenWords={2000}
                    />
                  )}
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
                I design scalable <span className="text-cyan-400 font-semibold">AI-driven applications</span> and
                <span className="text-purple-400 font-semibold"> high-performance web platforms</span> that solve real problems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onMouseEnter={() => setIsHovering("hire")}
                  onMouseLeave={() => setIsHovering(null)}
                  className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Hire Me
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                  onMouseEnter={() => setIsHovering("portfolio")}
                  onMouseLeave={() => setIsHovering(null)}
                  className="group relative px-8 py-4 rounded-full font-semibold text-lg text-cyan-400 border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-cyan-500/30 hover:bg-cyan-500/10 backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    View Portfolio
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Social/Stats Row */}
              <div className="flex items-center gap-8 pt-4 text-sm text-gray-400 border-t border-cyan-500/10 mt-8 pt-8">
                <div>
                  <p className="text-cyan-400 text-lg font-bold">5+</p>
                  <p>Years Experience</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-lg font-bold">30+</p>
                  <p>Projects Delivered</p>
                </div>
                <div>
                  <p className="text-cyan-400 text-lg font-bold">15+</p>
                  <p>Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Right Side - Tech Stack Visualization */}
            <div
              className={`hidden lg:flex flex-col items-center justify-center transition-all duration-700 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              }}
            >
              <div className="relative w-full h-96">
                {/* Glassmorphism Card */}
                <div className="absolute inset-0 rounded-3xl border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-2xl overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Tech Stack Grid */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <TechIcon name="AI/ML" icon="🤖" />
                      <TechIcon name="Web Dev" icon="⚡" />
                      <TechIcon name="Cloud" icon="☁️" />
                      <TechIcon name="APIs" icon="🔗" />
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating circles for visual interest */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-cyan-500/20 animate-spin-slow opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-purple-500/20 animate-spin-slow-reverse opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-scroll-down">
        <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex items-start justify-center p-2 hover:border-cyan-400 transition-colors">
          <div className="w-1 h-2 bg-cyan-500/50 rounded-full animate-pulse" />
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes scroll-down {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(10px);
          }
          60% {
            transform: translateY(5px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 8s linear infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 2s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob,
          .animate-spin-slow,
          .animate-spin-slow-reverse,
          .animate-scroll-down {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

interface TechIconProps {
  name: string;
  icon: string;
}

const TechIcon: React.FC<TechIconProps> = ({ name, icon }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className="text-4xl transform group-hover:scale-125 transition-transform duration-300">
      {icon}
    </div>
    <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
      {name}
    </span>
  </div>
);

export default PremiumHero;
