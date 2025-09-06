import React, { useEffect, useRef, useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { IoIosMail } from "react-icons/io";

// Update this import path to where your types/resume.ts actually lives.
// e.g. import type { Resume } from "@/types/resume";
import type { Portfolio } from "../types/portfolio";
import { PORTFOLIO_INFO } from "../config/portfolioData";

/**
 * CLI Resume (typed to use your Resume type)
 *
 * Save as: src/components/CLIResumeFromResume.tsx
 * Edit the `resumeData` object below to match your real resume contents.
 */

/* ---------------- Sample resume data (edit this) ---------------- */
const resumeData: Portfolio = PORTFOLIO_INFO;

/* ---------------- Utility types ---------------- */
type HistoryItem = {
  kind: "cmd" | "out";
  text: string;
  meta?: any;
};

/* ---------------- CLI Component ---------------- */
export default function CLIResumeFromResume() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: "out", text: `Welcome — type "help" to see commands.` },
    { kind: "out", text: `Loaded resume for ${resumeData.personal.name} (${resumeData.personal.title})\n` },
  ]);
  const [processing, setProcessing] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  /* ---------- Commands help (derived from resume schema) ---------- */
  const commandsHelp = [
    { cmd: "help", desc: "List available commands" },
    { cmd: "about", desc: "Short intro & summary" },
    { cmd: "whoami", desc: "Name & title" },
    { cmd: "skills", desc: "Show grouped skills" },
    { cmd: "projects", desc: "List featured projects" },
    { cmd: "experience", desc: "List work roles (ids shown)" },
    { cmd: "role <id>", desc: "Show role detail" },
    { cmd: "open <id|resume>", desc: "Open project/role/resume in new tab" },
    { cmd: "resume --pdf", desc: "Open pre-rendered PDF resume (if provided)" },
    { cmd: "resume --json", desc: "Download resume JSON" },
    { cmd: "contact", desc: "Show contact links" },
    { cmd: "clear", desc: "Clear terminal" },
  ];

  /* ---------- Typewriter-style output ---------- */
  async function typeOut(text: string, speed = 18) {
    return new Promise<void>((resolve) => {
      const id = Math.random().toString(36).slice(2);
      setHistory((h) => [...h, { kind: "out", text: "", meta: { id } }]);
      let i = 0;
      function step() {
        i++;
        setHistory((h) =>
          h.map((it) => (it.meta?.id === id ? { ...it, text: text.slice(0, i) } : it))
        );
        if (i < text.length) {
          setTimeout(step, speed + Math.random() * 8);
        } else {
          setHistory((h) => h.map((it) => (it.meta?.id === id ? { kind: "out", text } : it)));
          resolve();
        }
      }
      step();
    });
  }

  /* ---------- Download JSON helper ---------- */
  function downloadJson(obj: any, filename = "resume.json") {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ---------- Run commands (wired to resumeData) ---------- */
  async function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [...h, { kind: "cmd", text: `$ ${cmd}` }]);
    setCmdHistory((ch) => [...ch, cmd]);
    setCmdIndex(null);
    setProcessing(true);

    const [base, ...args] = cmd.split(/\s+/);
    try {
      switch (base.toLowerCase()) {
        case "help":
          for (const c of commandsHelp) {
            await typeOut(`${c.cmd} — ${c.desc}\n`, 6);
          }
          break;

        case "about":
          {
            const p = resumeData.personal;
            const s = resumeData.summary ?? p.summary ?? p.headline ?? "";
            await typeOut(`${p.name} — ${p.title}\n\n${s}\n`);
            if (resumeData.highlights && resumeData.highlights.length) {
              await typeOut(`\nHighlights:\n- ${resumeData.highlights.join("\n- ")}\n`);
            }
          }
          break;

        case "whoami":
          await typeOut(`${resumeData.personal.name} — ${resumeData.personal.title}\n`);
          break;

        case "skills":
          if (!resumeData.skills || resumeData.skills.length === 0) {
            await typeOut("No skills defined in resume.\n");
            break;
          }
          for (const group of resumeData.skills) {
            await typeOut(`${group.title ?? "Skills"}: ${group.skills.map((s) => s.name).join(", ")}\n`, 8);
          }
          break;

        case "projects":
          if (!resumeData.projects || resumeData.projects.length === 0) {
            await typeOut("No projects listed.\n");
            break;
          }
          for (const p of resumeData.projects) {
            await typeOut(`${p.id ?? "(no-id)"}: ${p.title} — ${p.short ?? p.description ?? ""}\n`, 10);
          }
          await typeOut(`\nOpen a project: open <project-id>\n`);
          break;

        case "experience":
          if (!resumeData.experience || resumeData.experience.length === 0) {
            await typeOut("No experience entries.\n");
            break;
          }
          for (const r of resumeData.experience) {
            await typeOut(`${r.id ?? "(no-id)"}: ${r.title} @ ${r.company ?? ""} — ${formatDateRange(r.date)}\n`, 6);
          }
          await typeOut(`\nView role details: role <id>\n`);
          break;

        case "role":
          {
            const id = args[0];
            if (!id) {
              await typeOut(`Usage: role <id>\n`);
              break;
            }
            const found = (resumeData.experience || []).find((x) => x.id === id);
            if (!found) {
              await typeOut(`No role found with id "${id}". Use 'experience' to list ids.\n`);
              break;
            }
            await typeOut(`${found.title} @ ${found.company ?? ""} — ${formatDateRange(found.date)}\n\n`, 6);
            if (found.summary) await typeOut(`${found.summary}\n\n`);
            if (found.bullets) {
              for (const b of found.bullets) await typeOut(`- ${b}\n`, 6);
            }
            if (found.tech && found.tech.length) await typeOut(`Tech: ${found.tech.join(", ")}\n`, 6);
            if (found.link) await typeOut(`Company: ${found.link}\n`, 6);
          }
          break;

        case "open":
          {
            const target = args[0];
            if (!target) {
              await typeOut(`Usage: open <project-id|role-id|resume>\n`);
              break;
            }
            if (target === "resume") {
              const pdf = resumeData.meta?.pdf;
              const url = pdf ?? resumeData.meta?.url ?? resumeData.personal.contact?.website;
              if (url) {
                await typeOut(`Opening resume at ${url}\n`);
                window.open(url, "_blank", "noopener");
              } else {
                await typeOut("No resume URL found in resume.meta or personal.contact.website.\n");
              }
              break;
            }

            // try projects first
            const proj = (resumeData.projects || []).find((p) => p.id === target);
            if (proj) {
              const u = (proj.href || proj.links?.[0]?.url);
              if (u) {
                await typeOut(`Opening ${proj.title} -> ${u}\n`);
                window.open(u, "_blank", "noopener");
              } else {
                await typeOut(`${proj.title} has no href/links.\n`);
              }
              break;
            }

            // try roles
            const role = (resumeData.experience || []).find((r) => r.id === target);
            if (role) {
              if (role.link) {
                await typeOut(`Opening ${role.company} -> ${role.link}\n`);
                window.open(role.link, "_blank", "noopener");
              } else {
                await typeOut(`${role.title} has no company link.\n`);
              }
              break;
            }

            await typeOut(`No project or role found with id "${target}".\n`);
          }
          break;

        case "resume":
          {
            const flag = args[0];
            if (flag === "--pdf") {
              const pdf = resumeData.meta?.pdf;
              if (pdf) {
                await typeOut(`Opening PDF resume: ${pdf}\n`);
                window.open(pdf, "_blank", "noopener");
              } else {
                await typeOut("No PDF available (resume.meta.pdf not set).\n");
              }
            } else if (flag === "--json") {
              await typeOut("Downloading resume JSON...\n");
              downloadJson(resumeData, `${resumeData.personal.name.replace(/\s+/g, "_")}_resume.json`);
            } else {
              // fallback: open canonical url or pdf
              const url = resumeData.meta?.url ?? resumeData.meta?.pdf ?? resumeData.personal.contact?.website;
              if (url) {
                await typeOut(`Opening ${url}\n`);
                window.open(url, "_blank", "noopener");
              } else {
                await typeOut("No resume URL or PDF found in resume.meta.\n");
              }
            }
          }
          break;

        case "contact":
          {
            const c = resumeData.personal.contact;
            if (!c) {
              await typeOut("No contact info.\n");
            } else {
              if (c.email) await typeOut(`Email: ${c.email}\n`);
              if (c.phone) await typeOut(`Phone: ${c.phone}\n`);
              if (c.website) await typeOut(`Website: ${c.website}\n`);
              if (c.location) await typeOut(`Location: ${c.location}\n`);
              if (c.socials && c.socials.length) {
                for (const s of c.socials) {
                  await typeOut(`${s.label}: ${s.url}\n`, 6);
                }
              }
            }
          }
          break;

        case "clear":
          setHistory([]);
          await typeOut(`(terminal cleared)\n`);
          break;

        default:
          await typeOut(`Command not found: ${base}\nType "help" for available commands.\n`);
          break;
      }
    } catch (err) {
      await typeOut(`Error: ${(err as Error).message}\n`);
    } finally {
      setProcessing(false);
    }
  }

  /* ---------- Key handlers (enter, history, tab-complete) ---------- */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input;
      setInput("");
      runCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx = cmdIndex === null ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      if (cmdIndex === null) return;
      const idx = Math.min(cmdHistory.length - 1, cmdIndex + 1);
      setCmdIndex(idx);
      setInput(cmdHistory[idx] || "");
      if (idx === cmdHistory.length - 1) {
        setCmdIndex(null);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const options = [
        "help",
        "about",
        "skills",
        "projects",
        "experience",
        "role",
        "open",
        "resume",
        "contact",
        "clear",
      ];
      const match = options.find((o) => o.startsWith(input));
      if (match) setInput(match + (match === "open" || match === "role" ? " " : ""));
    }
  }

  function renderHistory() {
    return history.map((h, i) => {
      if (h.kind === "cmd") {
        return (
          <div key={i} className="whitespace-pre-wrap text-slate-200">
            <span className="text-emerald-400">$</span> <span>{h.text.replace(/^\$\s*/, "")}</span>
          </div>
        );
      }
      return (
        <pre key={i} className="whitespace-pre-wrap text-slate-300 leading-relaxed">
          {h.text}
        </pre>
      );
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl overflow-hidden border border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/80 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="ml-2 text-xs text-slate-400 font-mono">
            {resumeData.personal.name.toLowerCase().replace(/\s+/g, "")}@portfolio: ~
          </div>

          <div className="ml-auto flex items-center gap-3 text-slate-400">
            <a href={resumeData.personal.contact?.website} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Website">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.7"/></svg>
            </a>
            {resumeData.personal.contact?.socials?.map((s) => {
              if (s.label.toLowerCase().includes("github"))
                return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white"><SiGithub /></a>;
              if (s.label.toLowerCase().includes("linkedin"))
                return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white"><SiLinkedin /></a>;
              return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white">{s.label}</a>;
            })}
            <a href={`mailto:${resumeData.personal.contact?.email}`} className="hover:text-white"><IoIosMail /></a>
          </div>
        </div>

        <div className="p-5 lg:p-6">
          <div
            ref={wrapperRef}
            className="h-[340px] md:h-[340px] overflow-auto rounded-md bg-gradient-to-b from-slate-900/40 to-transparent p-4 border border-slate-800"
            aria-live="polite"
          >
            <div className="font-mono text-sm">{renderHistory()}</div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-emerald-400">$</span>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={processing ? "processing..." : 'type "help" and press Enter'}
              className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-500 font-mono text-sm"
              disabled={processing}
              aria-label="CLI command input"
              autoComplete="off"
              spellCheck={false}
            />

            <button
              onClick={() => {
                runCommand(input);
                setInput("");
                inputRef.current?.focus();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
              aria-label="Run command"
              disabled={processing}
            >
              Run
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["help", "about", "skills", "projects", "experience", "resume --pdf", "resume --json", "contact", "clear"].map((c) => (
              <button
                key={c}
                onClick={() => {
                  setInput(c);
                  inputRef.current?.focus();
                }}
                className="text-xs px-2 py-1 rounded bg-slate-700/40 text-slate-200 hover:bg-slate-700/60"
                aria-label={`quick command ${c}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-slate-700 bg-slate-900/70 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Tip: press <span className="font-mono text-slate-200">Tab</span> to autocomplete.
          </div>

          <div className="text-sm text-slate-400">
            <span className="text-slate-200 font-semibold">{resumeData.personal.name}</span> • {resumeData.personal.title}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper ---------------- */
function formatDateRange(d?: string | { start?: string; end?: string; present?: boolean } | undefined) {
  if (!d) return "";
  if (typeof d === "string") return d;
  const { start, end, present } = d;
  if (present) return `${start ?? ""} - Present`;
  return `${start ?? ""}${end ? " - " + end : ""}`.trim();
}
