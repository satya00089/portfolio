// PortfolioPage.tsx
import React, { useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { SkillsList } from "../components/SkillsList";
import { ContactForm } from "../components/ContactForm";
import { Footer } from "../components/shared/Footer";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import { About } from "../components/About";
import type { Project } from "../types/portfolio";
import { ProjectModal } from "../components/ProjectModal";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { ScrollToTop } from "../components/shared/ScrollToTop";
import CLIResume from "../components/CLIResume";
import { BackgroundBeams } from "../components/BackgroundBeams";
import CurvedLoop from "../components/CurvedLoop";

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);

  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <Header
        links={[
          { href: "#about", label: "About" },
          { href: "#projects", label: "Projects" },
          { href: "#skills", label: "Skills" },
          { href: "#contact", label: "Contact" },
        ]}
        onTryCLI={() => setShowCLI(true)}
      />
      {/* CLI panel (docked / overlay) */}
      <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

      <section id="about" className="relative w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-0" style={{ height: '100vh' }}>
        <div className="absolute inset-0 z-0" style={{ height: '140vh' }}>
          <BackgroundBeams />
        </div>
        <div className="relative z-10 w-full max-w-6xl 2xl:max-w-7xl mx-auto py-20 sm:py-24 lg:py-32">
          <div className="grid items-center">
            <About />
          </div>
        </div>
      </section>
      <div className="w-full bg-[var(--background)] pt-8 pb-8 relative z-20">
        <CurvedLoop
          marqueeText={PORTFOLIO_INFO.personal.headline + ' · '}
          speed={1}
          className="text-2xl text-[var(--text)] bg-[var(--surface)]"
          curveAmount={400}
          direction="left"
          interactive={true}
        />
      </div>

      <main className="max-w-6xl 2xl:max-w-9xl mx-auto px-6 py-15 sm:py-20 lg:py-32 relative z-20">
        <section id="projects" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Projects</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            Selected work — click a card for details.
          </p>
          <ProjectsGrid
            projects={PORTFOLIO_INFO.projects}
            onOpen={setSelected}
          />
        </section>

        <section id="skills" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Skills</h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tools and technologies I use regularly.
          </p>
          <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
        </section>

        <section id="contact" className="py-8">
          <h2 className="text-2xl font-semibold text-[var(--brand)]">Contact</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tell me about your project, or just say hi.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
              <ContactForm />
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-4">
              <div>
                <div className="font-semibold">Let's collaborate</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  I'm available for freelance and contract work. My inbox is
                  open.
                </div>
              </div>
              <div className="mt-2">
                <div className="font-semibold">Quick contact</div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Email: satyasubudhi089@gmail.com
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Location: Remote
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-sm font-medium">Resume</div>
                <a
                  href="/"
                  className="block mt-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollToTop />
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
