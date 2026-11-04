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
import { GitHubCity } from "../components/GitHubCity";

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

      <section
        id="about"
        className="hero-panel relative w-full overflow-hidden"
      >
        <div className="relative z-10 flex min-h-[min(760px,100svh)] w-full items-center justify-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <About />
          </div>
        </div>
      </section>

      <main className="portfolio-main max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <section id="projects" className="portfolio-section py-12 sm:py-16">
          <div className="section-heading">
            <span className="section-index">01 / SELECTED WORK</span>
            <h2>Built to be used.</h2>
            <p>
              Products and systems I’ve taken from the first sketch to
              production.
            </p>
          </div>
          <ProjectsGrid
            projects={PORTFOLIO_INFO.projects}
            onOpen={setSelected}
          />
        </section>

        <section id="skills" className="portfolio-section py-12 sm:py-16">
          <div className="section-heading">
            <span className="section-index">02 / TOOLKIT</span>
            <h2>One team of one.</h2>
            <p>
              From interface details to infrastructure, I can own the full
              delivery loop.
            </p>
          </div>
          <SkillsList skills={PORTFOLIO_INFO.skills} isBar={true} />
        </section>

        <section id="contact" className="portfolio-section py-12 sm:py-16">
          <div className="section-heading">
            <span className="section-index">03 / CONTACT</span>
            <h2>Have a good one in mind?</h2>
            <p>
              Tell me what you’re building. I’m available for freelance and
              contract work.
            </p>
          </div>
          <div className="contact-grid mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="contact-panel p-6">
              <ContactForm />
            </div>

            <div className="contact-panel p-6 flex flex-col gap-4">
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
                  Email:{" "}
                  <a
                    className="contact-email"
                    href={`mailto:${PORTFOLIO_INFO.personal.contact?.email ?? "satyasubudhi089@gmail.com"}`}
                  >
                    {PORTFOLIO_INFO.personal.contact?.email ??
                      "satyasubudhi089@gmail.com"}
                  </a>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Location: Remote
                </div>
              </div>
              <div className="mt-auto">
                <div className="text-sm font-medium">Resume</div>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  className="brutal-button block mt-2 px-4 py-2"
                >
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="city-wrap max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <GitHubCity />
      </div>
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
