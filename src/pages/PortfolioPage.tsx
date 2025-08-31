import React, { useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/Footer";
import { PERSONAL, PROJECTS_DATA, SKILLS } from "../config/portfolioData";
import { About } from "../components/About";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <ThemeProvider>
      <Header
        links={[
          { href: "#about", label: "About" },
          { href: "#projects", label: "Projects" },
          { href: "#skills", label: "Skills" },
          { href: "#contact", label: "Contact" },
        ]}
      />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <About personal={PERSONAL} />

        <section id="projects" className="py-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--brand)]">
            Projects
          </h2>
          <ProjectsGrid projects={PROJECTS_DATA} onOpen={setSelected} />
        </section>

        <section id="skills" className="py-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--brand)]">
            Skills
          </h2>
          <SkillsList skills={SKILLS} />
        </section>

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">
            Contact
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <ContactForm />
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <div className="font-semibold">Quick contact</div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Email: satyasubudhi089@gmail.com
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Location: Remote
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ProjectModal
        project={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </ThemeProvider>
  );
};

export default PortfolioPage;
