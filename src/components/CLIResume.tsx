import React, { useEffect, useRef, useState } from "react";
import type { Portfolio } from "../types/portfolio";
import { PORTFOLIO_INFO } from "../config/portfolioData";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

type Props = { open?: boolean; onClose?: () => void };

const resumeData: Portfolio = PORTFOLIO_INFO;
type HistoryItem = { kind: "cmd" | "out"; text: string; meta?: any };

export default function CLIResume({ open = false, onClose }: Props) {
  const [visible, setVisible] = useState(open);
  const [minimized, setMinimized] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: "out", text: `Welcome — type "help" to see commands.` },
    {
      kind: "out",
      text: `Loaded resume for ${resumeData.personal.name} (${resumeData.personal.title})\n`,
    },
  ]);
  const [processing, setProcessing] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setVisible(open), [open]);

  useEffect(() => {
    if (visible && !minimized) inputRef.current?.focus();
  }, [visible, minimized]);

  useEffect(() => {
    // scroll to bottom when history changes
    wrapperRef.current?.scrollTo({
      top: wrapperRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!visible) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "m" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setMinimized((s) => !s);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  function handleClose() {
    setVisible(false);
    setMinimized(false);
    setFullscreen(false);
    onClose?.();
  }

  /* ---------------- typewriter helper ---------------- */
  async function typeOut(text: string, speed = 18) {
    return new Promise<void>((resolve) => {
      const id = Math.random().toString(36).slice(2);
      setHistory((h) => [...h, { kind: "out", text: "", meta: { id } }]);
      let i = 0;
      function step() {
        i++;
        setHistory((h) =>
          h.map((it) =>
            it.meta?.id === id ? { ...it, text: text.slice(0, i) } : it
          )
        );
        if (i < text.length) setTimeout(step, speed + Math.random() * 8);
        else {
          setHistory((h) =>
            h.map((it) => (it.meta?.id === id ? { kind: "out", text } : it))
          );
          resolve();
        }
      }
      step();
    });
  }

  function downloadJson(obj: any, filename = "resume.json") {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* ---------------- command runner (kept intact) ---------------- */
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
          await typeOut(
            [
              "help — List available commands",
              "about — Short intro & summary",
              "whoami — Name & title",
              "skills — Show grouped skills",
              "projects — List featured projects",
              "experience — List work roles (ids shown)",
              "role <id> — Show role detail",
              "open <id|resume> — Open project/role/resume in new tab",
              "resume --pdf — Open pre-rendered PDF resume (if provided)",
              "resume --json — Download resume JSON",
              "contact — Show contact links",
              "clear — Clear terminal",
            ].join("\n") + "\n",
            6
          );
          break;
        case "about": {
          const p = resumeData.personal;
          const s = resumeData.summary ?? p.summary ?? p.headline ?? "";
          await typeOut(`${p.name} — ${p.title}\n\n${s}\n`);
          if (resumeData.highlights && resumeData.highlights.length) {
            await typeOut(
              `\nHighlights:\n- ${resumeData.highlights.join("\n- ")}\n`
            );
          }
          break;
        }
        case "whoami":
          await typeOut(
            `${resumeData.personal.name} — ${resumeData.personal.title}\n`
          );
          break;
        case "skills":
          if (!resumeData.skills || resumeData.skills.length === 0) {
            await typeOut("No skills defined in resume.\n");
            break;
          }
          for (const group of resumeData.skills) {
            await typeOut(
              `${group.title ?? "Skills"}: ${group.skills
                .map((s) => s.name)
                .join(", ")}\n`,
              8
            );
          }
          break;
        case "projects":
          if (!resumeData.projects || resumeData.projects.length === 0) {
            await typeOut("No projects listed.\n");
            break;
          }
          for (const p of resumeData.projects) {
            await typeOut(
              `${p.id ?? "(no-id)"}: ${p.title} — ${
                p.short ?? p.description ?? ""
              }\n`,
              10
            );
          }
          await typeOut(`\nOpen a project: open <project-id>\n`);
          break;
        case "experience":
          if (!resumeData.experience || resumeData.experience.length === 0) {
            await typeOut("No experience entries.\n");
            break;
          }
          for (const r of resumeData.experience) {
            await typeOut(
              `${r.id ?? "(no-id)"}: ${r.title} @ ${
                r.company ?? ""
              } — ${formatDateRange(r.date)}\n`,
              6
            );
          }
          await typeOut(`\nView role details: role <id>\n`);
          break;
        case "role": {
          const id = args[0];
          if (!id) {
            await typeOut(`Usage: role <id>\n`);
            break;
          }
          const found = (resumeData.experience || []).find((x) => x.id === id);
          if (!found) {
            await typeOut(
              `No role found with id "${id}". Use 'experience' to list ids.\n`
            );
            break;
          }
          await typeOut(
            `${found.title} @ ${found.company ?? ""} — ${formatDateRange(
              found.date
            )}\n\n`,
            6
          );
          if (found.summary) await typeOut(`${found.summary}\n\n`);
          if (found.bullets) {
            for (const b of found.bullets) await typeOut(`- ${b}\n`, 6);
          }
          if (found.tech && found.tech.length)
            await typeOut(`Tech: ${found.tech.join(", ")}\n`, 6);
          if (found.link) await typeOut(`Company: ${found.link}\n`, 6);
          break;
        }
        case "open": {
          const target = args[0];
          if (!target) {
            await typeOut(`Usage: open <project-id|role-id|resume>\n`);
            break;
          }
          if (target === "resume") {
            const pdf = resumeData.meta?.pdf;
            const url =
              pdf ??
              resumeData.meta?.url ??
              resumeData.personal.contact?.website;
            if (url) {
              await typeOut(`Opening resume at ${url}\n`);
              window.open(url, "_blank", "noopener");
            } else {
              await typeOut(
                "No resume URL found in resume.meta or personal.contact.website.\n"
              );
            }
            break;
          }
          const proj = (resumeData.projects || []).find((p) => p.id === target);
          if (proj) {
            const u = proj.href || proj.links?.[0]?.url;
            if (u) {
              await typeOut(`Opening ${proj.title} -> ${u}\n`);
              window.open(u, "_blank", "noopener");
            } else {
              await typeOut(`${proj.title} has no href/links.\n`);
            }
            break;
          }
          const role = (resumeData.experience || []).find(
            (r) => r.id === target
          );
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
          break;
        }
        case "resume": {
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
            downloadJson(
              resumeData,
              `${resumeData.personal.name.replace(/\s+/g, "_")}_resume.json`
            );
          } else {
            const url =
              resumeData.meta?.url ??
              resumeData.meta?.pdf ??
              resumeData.personal.contact?.website;
            if (url) {
              await typeOut(`Opening ${url}\n`);
              window.open(url, "_blank", "noopener");
            } else {
              await typeOut("No resume URL or PDF found in resume.meta.\n");
            }
          }
          break;
        }
        case "contact": {
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
          break;
        }
        case "clear":
          setHistory([]);
          await typeOut(`(terminal cleared)\n`);
          break;
        default:
          queryRagApi(cmd).then(async (resp) => {
            if (resp?.answer) {
              const out = resp.answer;
              await typeOut(out + "\n", 6);
            } else {
              await typeOut(`Unknown command: ${cmd}\n`);
            }
          });
          break;
      }
    } catch (err) {
      await typeOut(`Error: ${(err as Error).message}\n`);
    } finally {
      setProcessing(false);
    }
  }

  /* ---------------- input handlers ---------------- */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input;
      setInput("");
      runCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx =
        cmdIndex === null ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
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
      if (match)
        setInput(match + (match === "open" || match === "role" ? " " : ""));
    }
  }

  function renderHistory() {
    return history.map((h, i) => {
      if (h.kind === "cmd") {
        return (
          <div key={i} className="whitespace-pre-wrap text-slate-200">
            <span className="text-emerald-400">$</span>{" "}
            <span>{h.text.replace(/^\$\s*/, "")}</span>
          </div>
        );
      }
      return (
        <pre
          key={i}
          className="whitespace-pre-wrap text-slate-300 leading-relaxed"
        >
          {h.text}
        </pre>
      );
    });
  }

  async function queryRagApi(q: string) {
    const url = `${API_URL}/api/query`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q }),
    });
    const json = await resp.json();
    return json;
  }

  if (!visible) return null;

  return (
    <>
      {/* dim overlay only in fullscreen */}
      <div
        className={`fixed inset-0 transition-opacity ${
          fullscreen ? "bg-black/60" : "pointer-events-none"
        } z-60`}
        aria-hidden
      />

      {/* centered/docked panel */}
      <div
        className={`fixed z-60 bottom-4 left-1/2 transform -translate-x-1/2 px-4`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`w-full max-w-4xl transition-all transform
            ${
              fullscreen
                ? "h-full mt-0 rounded-none"
                : minimized
                ? "h-12"
                : "h-[420px] rounded-xl"
            }
            bg-[var(--vscode-panel,#0f1724)] border border-slate-700 shadow-2xl overflow-hidden`}
          style={{ backdropFilter: "blur(6px)" }}
        >
          {/*
            Use grid layout: title / content / input rows.
            IMPORTANT: content uses min-h-0 so overflow-y works inside the grid.
          */}
          <div
            className={`h-full grid`}
            style={{ gridTemplateRows: "auto 1fr auto" }}
          >
            {/* titlebar */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[var(--vscode-bar,#0b1220)] border-b border-slate-700">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  title="Close"
                  className="w-3 h-3 rounded-full shadow-sm transform hover:scale-110"
                  aria-label="Close terminal"
                >
                  <span className="block w-3 h-3 bg-red-500 rounded-full" />
                </button>

                <button
                  onClick={() => setMinimized((s) => !s)}
                  title="Minimize"
                  className="w-3 h-3 rounded-full shadow-sm transform hover:scale-110"
                  aria-label="Minimize terminal"
                >
                  <span className="block w-3 h-3 bg-amber-500 rounded-full" />
                </button>

                <button
                  onClick={() => setFullscreen((s) => !s)}
                  title="Toggle fullscreen"
                  className="w-3 h-3 rounded-full shadow-sm transform hover:scale-110"
                  aria-label="Toggle fullscreen"
                >
                  <span className="block w-3 h-3 bg-green-500 rounded-full" />
                </button>
              </div>

              <div className="ml-3 flex items-center gap-2">
                <div className="text-xs font-medium text-slate-200 bg-slate-800/30 px-2 py-0.5 rounded-sm">
                  Terminal
                </div>
                <div className="text-xs text-slate-400 ml-2">
                  bash —{" "}
                  {resumeData.personal.name.toLowerCase().replace(/\s+/g, "")}
                  @portfolio
                </div>
              </div>

              <div className="ml-auto flex items-center gap-3 text-slate-300 text-xs">
                <div className="hidden sm:block">
                  Press{" "}
                  <span className="font-mono bg-slate-800 px-1 rounded">
                    Tab
                  </span>{" "}
                  to autocomplete
                </div>
                <button
                  onClick={() => {
                    setHistory([]);
                    setInput("");
                  }}
                  className="text-xs px-2 py-1 rounded hover:bg-slate-700/40"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* content: min-h-0 is crucial to allow inner scrolling in flex/grid containers */}
            {!minimized ? (
              <div
                ref={wrapperRef}
                className="min-h-0 overflow-y-auto font-mono text-sm p-4 bg-gradient-to-b from-slate-900/20 to-transparent text-slate-200"
                aria-live="polite"
                style={{
                  maxHeight: fullscreen ? "calc(100vh - 120px)" : "70vh",
                }}
                onWheel={(e) => {
                  // prevent page scroll when inner can scroll
                  const el = e.currentTarget as HTMLDivElement;
                  const atTop = el.scrollTop === 0 && e.deltaY < 0;
                  const atBottom =
                    Math.ceil(el.scrollTop + el.clientHeight) >=
                      el.scrollHeight && e.deltaY > 0;
                  if (atTop || atBottom) e.stopPropagation();
                }}
              >
                {renderHistory()}
              </div>
            ) : (
              <div className="h-12 flex items-center px-4 text-sm text-slate-300">
                <div className="font-mono text-emerald-400 mr-2">$</div>
                <div className="truncate">
                  terminal — minimized. Click the yellow dot to restore or the
                  red dot to close.
                </div>
              </div>
            )}

            {/* input row (always visible because grid row is auto) */}
            {!minimized && (
              <div className="px-4 py-3 bg-[var(--vscode-input,#02111a)] border-t border-slate-700 flex items-center gap-3">
                <span className="font-mono text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    processing ? "processing..." : 'type "help" and press Enter'
                  }
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- helper ---------------- */
function formatDateRange(
  d?: string | { start?: string; end?: string; present?: boolean } | undefined
) {
  if (!d) return "";
  if (typeof d === "string") return d;
  const { start, end, present } = d;
  if (present) return `${start ?? ""} - Present`;
  return `${start ?? ""}${end ? " - " + end : ""}`.trim();
}
