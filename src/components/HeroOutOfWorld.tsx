// src/components/HeroTimeline.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { IoIosMail } from "react-icons/io";

// sample data — replace with your own
const timeline = [
  { id: "t1", year: "2024", title: "Senior Developer", org: "Acme Inc", desc: "Led payments platform migration." },
  { id: "t2", year: "2022", title: "Full Stack Engineer", org: "Startup X", desc: "Built analytics and CI/CD pipeline." },
  { id: "t3", year: "2020", title: "Frontend Dev", org: "Agency Y", desc: "Shipping accessible UI components." }
];

const projects = [
  { id: "p1", title: "Realtime Dashboard", tech: ["React","Socket"], desc: "Multi-user metrics dashboard", url: "#" },
  { id: "p2", title: "Search Engine", tech: ["Node","Elastic"], desc: "Fast full-text search", url: "#" }
];

// small helper for styling
const Bullet: React.FC<{ active?: boolean }> = ({ active }) => (
  <div className={`w-3 h-3 rounded-full ${active ? "bg-violet-500 shadow-lg" : "bg-slate-600/80"}`} />
);

export default function HeroTimeline() {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Hero copy */}
      <div className="lg:col-span-7">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Satya Subudhi
        </h1>
        <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-xl">
          Full stack engineer building resilient web apps, APIs, and ML-backed features. I love small, meaningful features and improving developer DX.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#projects" className="px-5 py-3 rounded-md bg-violet-600 text-white font-semibold shadow-sm">See projects</a>
          <a href="/Satya_Resume.pdf" target="_blank" rel="noreferrer" className="px-5 py-3 rounded-md border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">Resume</a>
          <a href="mailto:you@domain.com" className="px-5 py-3 rounded-md border border-transparent text-slate-700 dark:text-slate-300">Contact</a>
        </div>

        {/* small skills row */}
        <div className="mt-8 flex flex-wrap gap-2">
          {["React","TypeScript","Tailwind","Node","ML"].map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">{s}</span>
          ))}
        </div>
      </div>

      {/* Timeline / Playground */}
      <aside className="lg:col-span-5">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Career timeline</div>
              <div className="text-xs text-slate-500">Click a point for details</div>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <a href="https://github.com" aria-label="github" target="_blank" rel="noreferrer"><SiGithub /></a>
              <a href="https://linkedin.com" aria-label="linkedin" target="_blank" rel="noreferrer"><SiLinkedin /></a>
              <a href="mailto:you@domain.com" aria-label="email"><IoIosMail /></a>
            </div>
          </div>

          {/* timeline graphic */}
          <div className="mt-4 border-l border-slate-200/10 pl-4">
            {timeline.map((t, idx) => {
              const active = selected === t.id;
              return (
                <div key={t.id} className="relative mb-6">
                  <button
                    onClick={() => setSelected(active ? null : t.id)}
                    className="flex items-start gap-4 w-full text-left"
                    aria-expanded={active}
                  >
                    <div className="pt-1">
                      <Bullet active={active} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between">
                        <div className="font-medium text-slate-900 dark:text-white">{t.title} <span className="text-sm text-slate-500">· {t.org}</span></div>
                        <div className="text-xs text-slate-400">{t.year}</div>
                      </div>

                      <AnimatePresence mode="wait">
                        {active && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            {t.desc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          <hr className="my-3 border-slate-200/8" />

          {/* project playground */}
          <div>
            <div className="text-sm font-semibold mb-2">Project playground</div>
            <div className="grid grid-cols-2 gap-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(selectedProject === p.id ? null : p.id)}
                  className={`p-2 rounded-md text-left border ${selectedProject === p.id ? "border-violet-500 bg-violet-500/8" : "border-slate-200/8"}`}
                >
                  <div className="font-medium text-sm">{p.title}</div>
                  <div className="text-xs text-slate-500">{p.tech.join(", ")}</div>
                  <AnimatePresence>
                    {selectedProject === p.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        {p.desc}
                        <div className="mt-2">
                          <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-violet-600">Open demo ↗</a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>
    </section>
  );
}
