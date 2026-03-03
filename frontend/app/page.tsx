"use client";

import { Suspense, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import ContactForm from "../components/ContactForm";
import AboutSection from "../components/AboutSection";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { Code, Palette, Zap, MessageCircle } from "lucide-react";
import PremiumHero from "../components/hero/PremiumHero";

export default function Home() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = revealRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);


  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      <main>
        <PremiumHero />

        {/* redesigned about section is now its own component */}
        <AboutSection />

        <section
          id="skills"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 via-transparent to-pink-900/40" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8 reveal" ref={(el) => { revealRefs.current[4] = el; }}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="gradient-text">Why Work With Me</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                I bring a unique combination of{" "}
                <span className="font-semibold text-white">technical expertise</span> and{" "}
                <span className="font-semibold text-white">creative vision</span> to every project.
                With a focus on clean code, thoughtful design, and clear communication, I deliver
                solutions that not only meet your requirements but exceed expectations.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <div className="card-premium p-8 bg-linear-to-br from-purple-800 to-pink-800 rounded-2xl border border-purple-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-linear-to-br from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Speed & Efficiency
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Rapid development without compromising quality
                  </p>
                </div>
                <div className="card-premium p-8 bg-linear-to-br from-pink-800 to-red-800 rounded-2xl border border-pink-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-linear-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Design Sense
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Eye for aesthetics and user experience
                  </p>
                </div>
                <div className="card-premium p-8 bg-linear-to-br from-blue-800 to-cyan-800 rounded-2xl border border-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Clean Code
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Maintainable, scalable, and well-documented
                  </p>
                </div>
                <div className="card-premium p-8 bg-linear-to-br from-green-800 to-emerald-800 rounded-2xl border border-green-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-linear-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Clear Communication
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Transparent updates and collaborative approach
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[60vh] flex items-center justify-center"><p className="text-gray-500">Loading projects…</p></section>}>
          <ProjectsSection />
        </Suspense>

        <section
          id="contact"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-br from-purple-50/50 via-transparent to-pink-50/50" />
          <div className="max-w-7xl mx-auto relative z-10 reveal" ref={(el) => { revealRefs.current[5] = el; }}>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
