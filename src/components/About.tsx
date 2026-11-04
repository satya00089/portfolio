import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_INFO } from "../config/portfolioData";

export const About: React.FC = () => {
  const name = PORTFOLIO_INFO.personal.name;

  const scrollTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  return (
    <div className="story-hero">
      <div className="story-hero-copy">
        <p className="story-eyebrow">
          INDEPENDENT SOFTWARE ENGINEER <span aria-hidden="true">·</span> BENGALURU
        </p>
        <h1 id="story-hero-heading">
          I take thoughtful
          <br className="story-hero-line-break" /> products from idea
          <br className="story-hero-line-break" /> to launch.
        </h1>
        <p className="story-hero-lede">
          Full-stack engineer <span aria-hidden="true">·</span> Interface to
          infrastructure
        </p>
      </div>

      <aside className="story-hero-card" aria-label="Start a project conversation">
        <p className="story-hero-card-kicker">WHAT ARE YOU MAKING?</p>
        <p className="story-hero-card-copy">
          A product that needs a thoughtful first version.
        </p>
        <a
          className="story-hero-card-action"
          href="#contact"
          onClick={(event) => scrollTo(event, "contact")}
        >
          Tell me about it <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </aside>

      <a
        className="story-hero-work-link"
        href="#projects"
        onClick={(event) => scrollTo(event, "projects")}
        aria-label={`Explore selected work by ${name}`}
      >
        Explore selected work <ArrowDown size={17} aria-hidden="true" />
      </a>
    </div>
  );
};
