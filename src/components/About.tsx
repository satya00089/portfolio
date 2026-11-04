import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_INFO } from "../config/portfolioData";

export const About: React.FC = () => {
  const personal = PORTFOLIO_INFO.personal;
  const avatar = personal.avatar;
  const portrait = Array.isArray(avatar)
    ? typeof avatar[0] === "string"
      ? avatar[0]
      : avatar[0]?.url
    : typeof avatar === "string"
      ? avatar
      : avatar?.url;

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
        <p className="story-eyebrow">INDEPENDENT SOFTWARE ENGINEER · BENGALURU</p>
        <h1>
          A good idea deserves
          <br />
          to make it <em>into the world.</em>
        </h1>
        <p className="story-hero-lede">
          I’m {personal.name}, a full-stack engineer who carries thoughtful
          products from the first sketch through launch—across interface, APIs,
          and cloud.
        </p>
        <div className="story-hero-actions">
          <a
            className="story-link story-link--primary"
            href="#projects"
            onClick={(event) => scrollTo(event, "projects")}
          >
            Follow the work <ArrowDownRight size={17} aria-hidden="true" />
          </a>
          <a
            className="story-link story-link--quiet"
            href="#contact"
            onClick={(event) => scrollTo(event, "contact")}
          >
            Tell me what you’re making <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="story-hero-footnote">
          <span className="story-ink-dot" />
          <span>7+ years turning complex ideas into working software</span>
        </div>
      </div>

      <figure className="story-portrait">
        <div className="story-portrait-image">
          {portrait && !portrait.includes("placeholder") ? (
            <img src={portrait} alt={personal.name} />
          ) : (
            <div className="story-portrait-initials" aria-hidden="true">
              SS
            </div>
          )}
        </div>
        <figcaption>
          <span>{personal.name}</span>
          <span>Engineer · maker · curious human</span>
        </figcaption>
        <span className="story-portrait-note" aria-hidden="true">
          good things take shape
        </span>
      </figure>

      <div className="story-chapter-cue" aria-hidden="true">
        <span>01</span>
        <span className="story-cue-line" />
        <span>THE WORK</span>
      </div>
    </div>
  );
};
