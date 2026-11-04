import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

export const Header: React.FC<{ links?: NavLink[]; onTryCLI?: () => void }> = ({
  links = [],
  onTryCLI,
}) => {
  const [active, setActive] = useState<string>(links[0]?.href ?? "#about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target instanceof HTMLElement) {
          setActive(`#${current.target.id}`);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#about"
          className="site-wordmark"
          onClick={() => setMenuOpen(false)}
        >
          Satya Subudhi
        </a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          aria-label="Primary"
          className={`header-nav ${menuOpen ? "is-open" : ""}`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "location" : undefined}
              className={active === link.href ? "is-active" : ""}
              onClick={(event) => {
                if (link.href.startsWith("#")) {
                  event.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)",
                    ).matches
                      ? "auto"
                      : "smooth",
                    block: "start",
                  });
                }
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="header-cli"
            onClick={() => {
              setMenuOpen(false);
              onTryCLI?.();
            }}
          >
            CLI résumé <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
