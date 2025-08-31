import { motion } from "framer-motion";
import type { Personal } from "../types/portfolio";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { IoIosMail } from "react-icons/io";

export const About: React.FC<{ personal: Personal }> = ({ personal }) => {
  return (
    <section
      id="about"
      className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[var(--brand)]">
          {personal.name}
        </h1>
        <p className="mt-4 text-lg max-w-prose">
          {personal.tagline}
        </p>

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
          >
            See projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800"
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
            <a
              href="https://github.com/satya00089"
              aria-label="github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors"
            >
              <SiGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/satya-subudhi/"
              aria-label="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors"
            >
              <SiLinkedin size={24} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="email"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors"
            >
              <IoIosMail size={24} />
            </a>
          </div>
        </div>
      </motion.aside>
    </section>
  );
};
