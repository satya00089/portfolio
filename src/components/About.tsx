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

  return (
    <div className="brutal-hero">
      <div className="hero-kicker">
        <span className="status-dot" />
        <span>FULL-STACK ENGINEER · BANGALORE / REMOTE</span>
        <span className="hero-kicker-note">AVAILABLE FOR SELECT PROJECTS</span>
      </div>

      <div className="hero-content-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">DESIGN → BUILD → SHIP</p>
          <h1>
            I take products
            <br />
            from idea to <span>production.</span>
          </h1>
          <p className="hero-summary">
            I’m {personal.name}, a product-minded full-stack engineer. I design
            and build useful software across the interface, API, and cloud—then
            help get it into people’s hands.
          </p>
          <div className="hero-actions">
            <a
              className="brutal-button brutal-button--blue"
              href="#projects"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("projects")?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "auto"
                    : "smooth",
                  block: "start",
                });
              }}
            >
              Explore projects <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className="brutal-text-link" href="#contact">
              Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-stack" aria-label="Primary technologies">
            <span>React</span>
            <b>·</b>
            <span>Python</span>
            <b>·</b>
            <span>FastAPI</span>
            <b>·</b>
            <span>AWS</span>
            <b>·</b>
            <span>Terraform</span>
          </div>
        </div>

        <div className="hero-art" aria-label="Profile portrait">
          <div className="hero-art-label">THE PERSON BEHIND THE BUILD</div>
          <div className="hero-photo-frame">
            {portrait && !portrait.includes("placeholder") ? (
              <img src={portrait} alt={personal.name} />
            ) : (
              <div className="hero-monogram" aria-hidden="true">
                SS
              </div>
            )}
          </div>
          <div className="hero-art-sticker" aria-hidden="true">
            FULL
            <br />
            STACK
            <br />
            THINKING
          </div>
          <div className="hero-art-caption">
            <strong>Good software is a team sport.</strong>
            <span>I bring the range to own the whole build.</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom-rule">
        <span>SCROLL TO SEE WHAT I’VE BUILT</span>
        <span aria-hidden="true">↓</span>
        <span>01 — 03</span>
      </div>
    </div>
  );
};
