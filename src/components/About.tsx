import { animate, motion } from "framer-motion";
import type { Personal } from "../types/portfolio";
import * as SiIcons from "react-icons/si";
import { Link } from "react-router-dom";

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  const text = personal.name.split("");

  const springScrollTo = (y: number) => {
    const controls = animate(window.scrollY, y, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
    return () => controls.stop();
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // normal navigation for external links
    if (!href.startsWith("#")) return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const headerEl = document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH;
    springScrollTo(y);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2"
      >
        <motion.h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--brand)]">
          {text.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.5 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-4 text-lg max-w-prose">{personal.headline}</p>

        <div className="mt-6 text-md dark:prose-invert max-w-none text-[var(--muted)]">
          <p>
            I design and build web applications with attention to performance,
            accessibility, and delightful details. Currently focusing on React +
            Tailwind workflows and component driven design.
          </p>
          <p>
            I enjoy shipping small, meaningful features and improving dev DX
            with tooling and automation.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--brand)] text-white font-medium"
            onClick={(e) => onNavClick(e, "#projects")}
          >
            See projects
          </a>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800"
          >
            See Resume
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800"
            onClick={(e) => onNavClick(e, "#contact")}
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 flex items-center justify-center text-4xl font-bold text-white">
            {personal.avatar ? (
              <img
                className="rounded-full"
                src={personal.avatar}
                alt="profile"
              />
            ) : (
              personal.name?.split(" ")[0]?.[0]
            )}
          </div>
          <div className="font-semibold">{personal.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {personal.title}
          </div>
          <div className="mt-3 flex gap-5 text-[var(--muted)]">
            {personal?.contact?.socials?.map((social, index) => {
              const Icon = SiIcons[social.icon as keyof typeof SiIcons];
              return (
                <a
                  key={social.label + index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {Icon ? (
                    <Icon
                      className="hover:text-[var(--brand)]"
                      size={social?.size ?? 16}
                    />
                  ) : (
                    <span>{social.label}</span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
