// src/components/Resume.tsx
import React from "react";
import { IoIosMail } from "react-icons/io";
import { LuMapPinHouse } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { IoPhonePortrait } from "react-icons/io5";
import * as SiIcons from "react-icons/si";
import { PORTFOLIO_INFO } from "../../config/portfolioData";
import type { DateRange, Portfolio } from "../../types/portfolio";

export const Resume: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const resumeInfo: Portfolio = PORTFOLIO_INFO;

  const personal = resumeInfo.personal ?? {
    name: "Your Name",
    title: "",
    headline: "",
    avatar: undefined,
    summary: "",
    contact: undefined,
  };

  const contact = personal.contact ?? {};
  const meta = resumeInfo.meta ?? {};

  function formatDate(date?: string | DateRange): string {
    if (!date) return "";
    if (typeof date === "string") return date;

    const start = date.start ?? "";
    if (date.present) return `${start} — Present`;
    if (date.end) return `${start} — ${date.end}`;
    return start;
  }

  return (
    <article
      className={`max-w-none print:prose-lg print:mx-6 ${className}`}
      aria-label="Printable resume"
      id="resume-print-area"
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {personal.name}
          </h1>
          {personal.title && (
            <p className="text-sm text-[var(--muted)] mt-1">{personal.title}</p>
          )}
          {personal.headline && (
            <div className="text-sm text-[var(--muted)] mt-1">
              {personal.headline}
            </div>
          )}
        </div>

        <div className="text-sm text-right space-y-1">
          {contact.email && (
            <div className="flex items-center justify-end gap-2">
              <IoIosMail size={16} />
              <a href={`mailto:${contact.email}`} className="underline">
                {contact.email}
              </a>
            </div>
          )}

          {contact.phone && (
            <div className="flex items-center justify-end gap-2">
              <IoPhonePortrait size={16} />
              <span>{contact.phone}</span>
            </div>
          )}

          {contact.website && (
            <div className="flex items-center justify-end gap-2">
              <TbWorldWww size={16} />
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {new URL(contact.website).hostname || contact.website}
              </a>
            </div>
          )}

          {contact.location && (
            <div className="flex items-center justify-end gap-2">
              <LuMapPinHouse size={16} />
              <span>{contact.location}</span>
            </div>
          )}

          {contact.socials && contact.socials.length > 0 && (
            <div className="flex items-center justify-end gap-3 flex-wrap">
              {contact.socials.map((s) => {
                const Icon = SiIcons[s.icon as keyof typeof SiIcons];
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative group"
                  >
                    {Icon ? (
                      <Icon
                        key={s.label}
                        size={s.size || 16}
                        className={`cursor-pointer text-[var(--text)] hover:text-[var(--brand)] transition`}
                        onClick={() => window.open(s.url, "_blank")}
                      />
                    ) : (
                      s.label
                    )}

                    {/* Tooltip */}
                    <span
                      className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
                        px-2 py-1 text-xs rounded-md
                        bg-[var(--surface)] text-[var(--text)]
                        border border-[var(--border)]
                        opacity-0 group-hover:opacity-100
                        transition duration-200 pointer-events-none
                        whitespace-nowrap z-10"
                    >
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section>
          <h2 className="text-base font-semibold mt-4">Summary</h2>
          <p className="text-sm text-[var(--text)]">{personal.summary}</p>
        </section>
      )}

      {/* Highlights (optional) */}
      {resumeInfo.highlights?.length ? (
        <section>
          <h2 className="text-base font-semibold mt-4">Highlights</h2>
          <ul className="list-disc list-inside text-sm">
            {resumeInfo.highlights.map((h, idx) => (
              <li key={idx}>{h}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Skills (groups) */}
      {resumeInfo.skills && resumeInfo.skills.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Skills</h2>
          <div className="space-y-3">
            {resumeInfo.skills.map((group, gi) => (
              <div key={gi}>
                {group.title && (
                  <div className="text-sm font-medium mb-1">{group.title}</div>
                )}
                <ul className="flex flex-wrap gap-2 text-sm">
                  {group.skills.map((s) => (
                    <li
                      key={s.name}
                      className="px-2 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                    >
                      {s.name}
                      {s.years ? (
                        <span className="ml-2 text-xs text-[var(--muted)]">
                          · {s.years}y
                        </span>
                      ) : null}
                      {s.level ? (
                        <span className="ml-1 text-xs text-[var(--muted)]">
                          · {s.level}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resumeInfo.experience && resumeInfo.experience.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Experience</h2>
          <div className="space-y-6">
            {resumeInfo.experience.map((exp, idx) => (
              <div key={exp.id ?? `${exp.title}-${idx}`} className="text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <div className="font-medium">
                      {exp.title}
                      {exp.company ? (
                        <span className="text-[var(--muted)]">
                          {" "}
                          — {exp.company}
                        </span>
                      ) : null}
                    </div>
                    {exp.location && (
                      <div className="text-xs text-[var(--muted)]">
                        {exp.location}
                      </div>
                    )}
                  </div>
                  <div className="text-[var(--muted)] mt-2 sm:mt-0">
                    {formatDate(exp?.date)}
                  </div>
                </div>

                {exp.summary && (
                  <p className="mt-2 text-[var(--text)]">{exp.summary}</p>
                )}

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-2">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="text-[var(--text)]">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {exp.tech && exp.tech.length > 0 && (
                  <div className="mt-2 text-xs text-[var(--muted)]">
                    Tech: {exp.tech.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resumeInfo.projects && resumeInfo.projects.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Projects</h2>
          <div className="space-y-4">
            {resumeInfo.projects.map((p) => (
              <div key={p.id ?? p.title} className="text-sm">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {p.title}
                    {p.short ? (
                      <span className="text-[var(--muted)]"> — {p.short}</span>
                    ) : null}
                  </div>
                  <div className="text-[var(--muted)]">
                    {typeof p.date === "string" ? p.date : p.date?.start ?? ""}
                  </div>
                </div>
                {p.description && (
                  <div className="mt-1 text-[var(--text)]">{p.description}</div>
                )}
                {p.tags && p.tags.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-semibold px-2 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resumeInfo.education && resumeInfo.education.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Education</h2>
          <div className="space-y-2 text-sm">
            {resumeInfo.education.map((ed) => (
              <div
                key={ed.school ?? ed.degree}
                className="flex justify-between"
              >
                <div>
                  {ed.degree ? <strong>{ed.degree}</strong> : null}
                  {ed.school ? <span className="ml-2">{ed.school}</span> : null}
                </div>
                <div className="text-[var(--muted)]">
                  {typeof ed.date === "string"
                    ? ed.date
                    : ed.date?.start ?? ed.date?.end ?? ""}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {resumeInfo.certifications && resumeInfo.certifications.length > 0 && (
        <section>
          <h2 className="text-base font-semibold mt-4">Certifications</h2>
          <ul className="text-sm list-disc list-inside">
            {resumeInfo.certifications.map((c) => (
              <li key={c.name}>
                <span className="font-medium">
                  {c.name}
                  {(c.issuer || c.url) && (
                    <span className="text-[var(--muted)]">
                      {c.issuer && (
                        <>
                          {" — "}
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-sm"
                            >
                              {c.issuer}
                            </a>
                          ) : (
                            <span>{c.issuer}</span>
                          )}
                        </>
                      )}

                      {/* If there's a URL but no issuer, just show "Link" */}
                      {!c.issuer && c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-sm"
                        >
                          Link
                        </a>
                      )}
                    </span>
                  )}
                </span>
                {c.date && (
                  <span className="text-xs text-[var(--muted)] ml-3">
                    {typeof c.date === "string"
                      ? c.date
                      : c.date.start ?? c.date.end}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer: small print / download */}
      <footer className="mt-6 text-xs text-[var(--muted)]">
        <div className="flex items-center justify-between">
          <div>
            © {new Date().getFullYear()} {personal.name}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={meta.pdf ?? "/resume.pdf"}
              className="inline-flex items-center gap-2 text-sm underline"
              download
            >
              <FaFileDownload className="w-4 h-4" /> Download PDF
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
};
