import React, { useState } from "react";
import { ThemeProvider } from "../components/ThemeProvider";
import { Header } from "../components/shared/Header";
import { ProjectsGrid } from "../components/ProjectsGrid";
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

const CORE_SKILL_GROUPS = ["Frontend", "Backend", "Infrastructure & DevOps"];

const getFeaturedGridLayout = (count: number) => {
  const layouts: Record<number, string> = {
    1: "single",
    2: "pair",
    3: "trio",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
  };

  return layouts[count] ?? "many";
};

const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [showCLI, setShowCLI] = useState(false);
  const projects = PORTFOLIO_INFO.projects ?? [];
  const clientWork = PORTFOLIO_INFO.clientWork;
  const clientProjects = clientWork?.projects ?? [];
  const projectDisplay = PORTFOLIO_INFO.projectDisplay;
  const configuredFeaturedCount = projectDisplay?.featuredCount ?? 3;
  const featuredCount = Number.isFinite(configuredFeaturedCount)
    ? Math.max(0, Math.floor(configuredFeaturedCount))
    : 3;
  const featuredProjects = projects.slice(0, featuredCount);
  const otherProjects = projects.slice(featuredCount);
  const featuredGridLayout = getFeaturedGridLayout(featuredProjects.length);
  const coreSkills = (PORTFOLIO_INFO.skills ?? []).filter((group) =>
    CORE_SKILL_GROUPS.includes(group.title ?? "Other"),
  );
  const otherSkills = (PORTFOLIO_INFO.skills ?? []).filter(
    (group) => !CORE_SKILL_GROUPS.includes(group.title ?? "Other"),
  );
  const currentRole = PORTFOLIO_INFO.experience?.find(
    (role) => role.id === "unisys-senior-2025",
  );
  const contact = PORTFOLIO_INFO.personal.contact;
  const email = contact?.email ?? "satyasubudhi089@gmail.com";

  return (
    <ThemeProvider>
      <div className="wabi-portfolio">
        <ScrollProgressBar />
        <Header
          links={[
            { href: "#about", label: "The beginning" },
            { href: "#projects", label: "The work" },
            { href: "#approach", label: "The practice" },
            { href: "#contact", label: "Let’s talk" },
          ]}
          onTryCLI={() => setShowCLI(true)}
        />
        <CLIResume open={showCLI} onClose={() => setShowCLI(false)} />

        <section
          id="about"
          className="story-hero-section"
          aria-labelledby="story-hero-heading"
        >
          <div className="story-page-width">
            <About />
          </div>
        </section>

        <main className="story-page-width story-main">
          <section id="projects" className="story-section story-work-section">
            <div className="story-work-layout">
              <div className="story-section-heading">
                <p className="story-eyebrow">01 / SELECTED WORK</p>
                <h2>
                  {projectDisplay?.heading ?? "Selected work, made with intention."}
                </h2>
                <p>
                  {projectDisplay?.intro ??
                    "A few product builds where complex ideas became useful, reliable, and a little more human."}
                </p>
                <a className="story-work-explore" href="#featured-projects">
                  Explore the work <span aria-hidden="true">↓</span>
                </a>
              </div>

              {featuredProjects.length > 0 && (
                <div
                  id="featured-projects"
                  className={`story-work-grid story-work-grid--${featuredGridLayout}`}
                  data-project-count={featuredProjects.length}
                >
                  <ProjectsGrid projects={featuredProjects} onOpen={setSelected} />
                </div>
              )}
            </div>

            {otherProjects.length > 0 && (
              <details className="story-more-work">
                <summary>
                  <span>More projects ({otherProjects.length})</span>
                  <span aria-hidden="true">＋</span>
                </summary>
                <div className="story-work-grid story-work-grid--more">
                  <ProjectsGrid projects={otherProjects} onOpen={setSelected} />
                </div>
              </details>
            )}
          </section>

          {clientProjects.length > 0 && (
            <section id="client-work" className="story-section story-client-section" aria-labelledby="client-work-heading">
              <div className="story-section-heading story-client-heading">
                <p className="story-eyebrow">CLIENT WORK</p>
                <h2 id="client-work-heading">{clientWork?.heading ?? "Made together, for the real world."}</h2>
                <p>{clientWork?.intro ?? "Work created with clients and the people they serve."}</p>
              </div>
              <div className="story-client-list">
                {clientProjects.map((project, index) => (
                  <article className="story-client-card" key={project.id ?? `${project.title}-${index}`}>
                    {project.image && (
                      <div className="story-client-preview">
                        <img src={project.image} alt={project.imageAlt ?? `${project.title} website preview`} loading="lazy" />
                      </div>
                    )}
                    <div className="story-client-copy">
                      <p className="story-client-label">CLIENT PROJECT <span aria-hidden="true">/</span> {String(index + 1).padStart(2, "0")}</p>
                      {project.logo && <img className="story-client-logo" src={project.logo} alt="" />}
                      <h3>{project.title}</h3>
                      {(project.short || project.description) && <p className="story-client-description">{project.short ?? project.description}</p>}
                      {Boolean(project.tags?.length) && <ul className="story-client-tags" aria-label="Project highlights">{project.tags?.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
                      <div className="story-client-actions">
                        <button type="button" onClick={() => setSelected(project)}>View project details <span aria-hidden="true">→</span></button>
                        {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">↗</span></a>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section id="approach" className="story-section story-practice-section">
            <div className="story-section-heading">
              <p className="story-eyebrow">02 / THE PRACTICE</p>
              <h2>Listen closely. Make with care. See it through.</h2>
              <p>
                Good software is shaped in the small decisions: what to leave
                out, what to make clear, and what will still work when it meets
                the real world.
              </p>
            </div>

            <div className="story-practice-list">
              <article className="story-practice-step">
                <span className="story-step-number">01</span>
                <div>
                  <h3>Find the real question</h3>
                  <p>
                    Start with the people, the friction, and the useful change
                    the product should make.
                  </p>
                </div>
                <span className="story-step-note">understand</span>
              </article>
              <article className="story-practice-step">
                <span className="story-step-number">02</span>
                <div>
                  <h3>Give the idea a shape</h3>
                  <p>
                    Bring interface, APIs, and system decisions into one
                    thoughtful, working whole.
                  </p>
                </div>
                <span className="story-step-note">make</span>
              </article>
              <article className="story-practice-step">
                <span className="story-step-number">03</span>
                <div>
                  <h3>Carry it into the world</h3>
                  <p>
                    Refine the details, prepare the cloud foundations, and stay
                    with the work through production.
                  </p>
                </div>
                <span className="story-step-note">ship</span>
              </article>
            </div>

            {currentRole && (
              <aside className="story-current-chapter">
                <span className="story-eyebrow">A CURRENT CHAPTER</span>
                <p>
                  {currentRole.title} at <strong>{currentRole.company}</strong>
                  <span> · Python services, React products, and cloud delivery</span>
                </p>
              </aside>
            )}
          </section>

          <section id="skills" className="story-section story-materials-section">
            <div className="story-section-heading">
              <p className="story-eyebrow">03 / THE MATERIALS</p>
              <h2>The tools change. The care stays.</h2>
              <p>
                A practical toolkit for moving between the first interaction,
                the service behind it, and the systems that carry it.
              </p>
            </div>

            <div className="story-skill-groups">
              {coreSkills.map((group) => (
                <div className="story-skill-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.skills.map((skill) => skill.name).join(" · ")}</p>
                </div>
              ))}
            </div>

            {otherSkills.length > 0 && (
              <details className="story-more-skills">
                <summary>Other tools and materials</summary>
                <div className="story-supplementary-skills">
                  {otherSkills.map((group) => (
                    <p key={group.title}>
                      <strong>{group.title}:</strong>{" "}
                      {group.skills.map((skill) => skill.name).join(" · ")}
                    </p>
                  ))}
                </div>
              </details>
            )}
          </section>

          <section id="contact" className="story-section story-contact-section">
            <div className="story-contact-intro">
              <p className="story-eyebrow">04 / BEGIN A CONVERSATION</p>
              <h2>Have something useful in mind?</h2>
              <p>
                Tell me what you’re trying to make. I’m open to freelance and
                contract work, and would be glad to hear where you’re starting.
              </p>
              <a className="story-email-link" href={`mailto:${email}`}>
                {email}
              </a>
              <p className="story-location">{contact?.location ?? "Remote"}</p>
              <a
                className="story-resume-link"
                href={`${import.meta.env.BASE_URL}resume.pdf`}
              >
                Read my résumé <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="story-contact-form">
              <ContactForm sendTo={email} />
            </div>
          </section>
        </main>

        <div className="story-page-width story-city-wrap">
          <GitHubCity />
        </div>
        <ScrollToTop />
        <Footer />

        <ProjectModal
          project={selected}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </ThemeProvider>
  );
};

export default PortfolioPage;
