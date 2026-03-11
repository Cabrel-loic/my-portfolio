import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Code,
  Server,
  Database,
  Cpu,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import ParticleSystem from "./hero/ParticleSystem";

const techList = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Django",
  "Python",
  "PostgreSQL",
];

const experiences = [
  {
    year: "2020",
    title: "Began learning to code",
    description: "Dove into HTML, CSS and JavaScript through online tutorials and small projects.",
  },
  {
    year: "2021",
    title: "First freelance client",
    description: "Delivered a custom WordPress site for a local business and discovered passion for web development.",
  },
  {
    year: "2022",
    title: "Joined a startup",
    description: "Worked as a full‑stack developer building SaaS features with React and Django.",
  },
  {
    year: "2023",
    title: "Exploring AI & ML",
    description: "Started integrating machine learning models and automation into personal and client projects.",
  },
];

export default function AboutSection() {
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

    // copy the list of refs so cleanup can refer to the same set
    const refs = revealRefs.current.slice();
    refs.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      refs.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black text-gray-200 overflow-hidden">
      {/* subtle particle background */}
      <ParticleSystem className="absolute inset-0 opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Profile intro */}
        <div
          className="grid md:grid-cols-2 gap-12 items-center reveal"
          ref={(el) => { revealRefs.current[0] = el; }}
        >
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full border-4 border-cyan-400/70 overflow-hidden shadow-2xl bg-linear-to-br from-cyan-500 to-blue-500">
              {/* replace the src below with your professional photo path/name */}
              <Image
                src="/assets/img/portfolio/your-photo.jpg"
                alt="Cabrel profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Hi, I&apos;m Cabrel</h2>
            <p className="text-lg leading-relaxed">
              Full‑stack developer with a passion for building dynamic, modern
              web experiences. I merge elegant design with solid engineering to
              create applications that users love and businesses rely on.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Services cards */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 reveal"
          ref={(el) => { revealRefs.current[1] = el; }}
        >
          {[
            {
              icon: <Code className="w-8 h-8 text-white" />,
              title: "Full-Stack Web Development",
              desc: "React, Next.js, Django and everything in between.",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              icon: <Server className="w-8 h-8 text-white" />,
              title: "API Design & Integration",
              desc: "REST, GraphQL and microservices that scale.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: <Database className="w-8 h-8 text-white" />,
              title: "Database Management",
              desc: "PostgreSQL, MongoDB, and cloud data solutions.",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              icon: <Cpu className="w-8 h-8 text-white" />,
              title: "Machine Learning & AI",
              desc: "Building intelligent features with Python and TensorFlow.",
              gradient: "from-yellow-500 to-orange-500",
            },
          ].map((svc, idx) => (
            <div
              key={idx}
              className={`bg-zinc-800/70 backdrop-blur-lg p-6 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-linear-to-br ${svc.gradient} mb-4`}
              >
                {svc.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
              <p className="text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech stack row */}
        <div
          className="space-y-6 reveal"
          ref={(el) => { revealRefs.current[2] = el; }}
        >
          <h3 className="text-2xl font-bold text-center">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techList.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-zinc-800/50 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div
          className="relative reveal"
          ref={(el) => { revealRefs.current[3] = el; }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Timeline
          </h3>
          <div className="border-l-2 border-cyan-600 pl-6 space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-4 top-1 w-3 h-3 bg-cyan-600 rounded-full" />
                <p className="text-sm font-semibold text-cyan-400">{exp.year}</p>
                <h4 className="text-lg font-semibold mt-1">{exp.title}</h4>
                <p className="text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
