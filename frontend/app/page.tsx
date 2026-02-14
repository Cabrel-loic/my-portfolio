"use client";

import { Suspense, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import ContactForm from "../components/ContactForm";
import { ProjectsSection } from "@/features/projects/components/ProjectsSection";
import { Code, Palette, Server, Sparkles, Zap, Heart, MessageCircle } from "lucide-react";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Navigation />

      <main>
        <section
          id="home"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 bg-pattern relative"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in-up relative z-10">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white mb-4 animate-fade-in border border-white/30">
                      <Sparkles className="w-4 h-4" />
                      Available for Projects
                    </span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white">
                    Full-Stack Web Developer
                    <br />
                    <span className="text-white/90">& Graphic Designer</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-2xl">
                    Crafting digital experiences that combine{" "}
                    <span className="font-semibold text-white">technical excellence</span>{" "}
                    with <span className="font-semibold text-white">creative vision</span>.
                    Building scalable solutions and beautiful interfaces that drive results.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="btn-premium px-8 py-4 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-all duration-300 font-semibold text-lg transform hover:scale-105 shadow-lg"
                  >
                    <span>View My Work</span>
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg transform hover:scale-105"
                  >
                    Contact Me
                  </button>
                </div>
              </div>

              <div className="hidden lg:block animate-float relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl blur-3xl opacity-50" />
                  <div className="relative w-full h-96 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                    <div className="text-center space-y-4">
                      <div className="text-8xl mb-4 animate-bounce">👨‍💻</div>
                      <div className="w-32 h-1 bg-white/50 rounded-full mx-auto" />
                      <p className="text-sm text-white/70 font-medium">Your Image Here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern opacity-30" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 reveal" ref={(el) => { revealRefs.current[0] = el; }}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                <span className="gradient-text">What I Do</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Delivering end-to-end solutions that bridge design and development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="card-premium bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 reveal"
                ref={(el) => { revealRefs.current[1] = el; }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Full-Stack Development
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Building robust, scalable web applications from frontend to
                  backend with modern frameworks and best practices.
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>

              <div
                className="card-premium bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 reveal"
                ref={(el) => { revealRefs.current[2] = el; }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  UI/UX & Graphic Design
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Creating intuitive, visually stunning interfaces that enhance
                  user experience and drive engagement.
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full" />
              </div>

              <div
                className="card-premium bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 reveal"
                ref={(el) => { revealRefs.current[3] = el; }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform duration-300 shadow-lg">
                  <Server className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  API & System Architecture
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Designing efficient, maintainable system architectures and
                  RESTful APIs that power modern applications.
                </p>
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8 reveal" ref={(el) => { revealRefs.current[4] = el; }}>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="gradient-text">Why Work With Me</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                I bring a unique combination of{" "}
                <span className="font-semibold text-gray-900">technical expertise</span> and{" "}
                <span className="font-semibold text-gray-900">creative vision</span> to every project.
                With a focus on clean code, thoughtful design, and clear communication, I deliver
                solutions that not only meet your requirements but exceed expectations.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <div className="card-premium p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Speed & Efficiency
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Rapid development without compromising quality
                  </p>
                </div>
                <div className="card-premium p-8 bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Design Sense
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Eye for aesthetics and user experience
                  </p>
                </div>
                <div className="card-premium p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Code className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Clean Code
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Maintainable, scalable, and well-documented
                  </p>
                </div>
                <div className="card-premium p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Clear Communication
                  </h3>
                  <p className="text-gray-600 text-sm">
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
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-pink-50/50" />
          <div className="max-w-7xl mx-auto relative z-10 reveal" ref={(el) => { revealRefs.current[5] = el; }}>
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
