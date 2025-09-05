import React, { useEffect, useRef, useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { IoIosMail } from "react-icons/io";

/**
 * CLI Resume Component
 * - Drop into your React + Tailwind app
 * - Edit the `personal` object below to match your data
 */

/* ---------- Your data (edit this) ---------- */
const personal = {
  name: "Satya Subudhi",
  title: "Full Stack Developer",
  email: "you@domain.com",
  resumeUrl: "/Satya_Resume.pdf", // public path to resume
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
  skills: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Postgres",
    "Docker",
  ],
  projects: [
    {
      id: "p1",
      title: "Project Alpha",
      short: "Realtime analytics dashboard",
      url: "#",
    },
    {
      id: "p2",
      title: "Project Nova",
      short: "AI-powered search",
      url: "#",
    },
    {
      id: "p3",
      title: "Project Atlas",
      short: "Scalable API platform",
      url: "#",
    },
  ],
};

/* ---------- Utility types ---------- */
type HistoryItem = {
  kind: "cmd" | "out";
  text: string;
  meta?: any;
};

/* ---------- CLI Component ---------- */
export default function CLIResume() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { kind: "out", text: `Welcome — type "help" to see commands.` },
  ]);
  const [processing, setProcessing] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // always scroll to bottom when history changes
    wrapperRef.current?.scrollTo({ top: wrapperRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  /* ---------- Commands handling ---------- */
  const commandsHelp = [
    { cmd: "help", desc: "List available commands" },
    { cmd: "about", desc: "Short intro" },
    { cmd: "whoami", desc: "Your name & title" },
    { cmd: "skills", desc: "Show top skills" },
    { cmd: "projects", desc: "List featured projects" },
    { cmd: "resume", desc: "Open/download resume (new tab)" },
    { cmd: "contact", desc: "Show contact links" },
    { cmd: "clear", desc: "Clear the terminal" },
  ];

  async function typeOut(text: string, speed = 18) {
    // push new out item and then mutate its text char-by-char
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
          setTimeout(step, speed + Math.random() * 6);
        } else {
          // finalize (remove meta)
          setHistory((h) => h.map((it) => (it.meta?.id === id ? { kind: "out", text } : it)));
          resolve();
        }
      }
      step();
    });
  }

  async function runCommand(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;

    // append typed command to history
    setHistory((h) => [...h, { kind: "cmd", text: `$ ${cmd}` }]);
    setCmdHistory((ch) => [...ch, cmd]);
    setCmdIndex(null);

    setProcessing(true);

    const [base, ...args] = cmd.split(/\s+/);
    try {
      switch (base.toLowerCase()) {
        case "help":
          for (const c of commandsHelp) {
            await typeOut(`${c.cmd} — ${c.desc}\n`, 2); // quick listing
          }
          break;

        case "about":
          await typeOut(`Hi — I'm ${personal.name}, ${personal.title}.\nI build web apps, APIs, and help teams ship reliable features.\n`);
          break;

        case "whoami":
          await typeOut(`${personal.name} — ${personal.title}\n`);
          break;

        case "skills":
          await typeOut(`Top skills: ${personal.skills.join(", ")}\n`);
          break;

        case "projects":
          for (const p of personal.projects) {
            await typeOut(`${p.title} — ${p.short}\n`, 10);
          }
          await typeOut(`Open a project: open <project-id>  e.g. open p1\n`);
          break;

        case "open":
          if (args.length === 0) {
            await typeOut(`Usage: open <project-id | resume>\nExample: open p1\n`);
          } else {
            const what = args[0];
            if (what === "resume") {
              await typeOut(`Opening resume in a new tab...\n`);
              window.open(personal.resumeUrl, "_blank", "noopener");
            } else {
              const found = personal.projects.find((x) => x.id === what);
              if (found) {
                await typeOut(`Opening ${found.title}...\n`);
                window.open(found.url, "_blank", "noopener");
              } else {
                await typeOut(`No project found with id "${what}". Type "projects" to list ids.\n`);
              }
            }
          }
          break;

        case "resume":
          await typeOut(`Opening resume in a new tab...`);
          window.open(personal.resumeUrl, "_blank", "noopener");
          break;

        case "contact":
          await typeOut(`Email: ${personal.email}\nGitHub: ${personal.github}\nLinkedIn: ${personal.linkedin}\n`);
          break;

        case "clear":
          setHistory([]);
          await typeOut(`(terminal cleared)\n`);
          break;

        default:
          await typeOut(`Command not found: ${base}\nType "help" for commands.\n`);
          break;
      }
    } catch (e) {
      await typeOut(`Error: ${(e as Error).message}\n`);
    } finally {
      setProcessing(false);
    }
  }

  /* ---------- Input handlers (history navigation) ---------- */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input;
      setInput("");
      runCommand(value);
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
      // basic tab-complete for a few commands
      e.preventDefault();
      const options = ["help", "about", "skills", "projects", "resume", "contact", "whoami", "clear", "open"];
      const match = options.find((o) => o.startsWith(input));
      if (match) setInput(match + (match === "open" ? " " : ""));
    }
  }

  /* ---------- Render helpers ---------- */
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
          {/* fake window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <div className="ml-2 text-xs text-slate-400 font-mono">satya@portfolio: ~</div>

          <div className="ml-auto flex items-center gap-3 text-slate-400">
            <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="GitHub">
              <SiGithub />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-white" aria-label="LinkedIn">
              <SiLinkedin />
            </a>
            <a href={`mailto:${personal.email}`} className="hover:text-white" aria-label="Email">
              <IoIosMail />
            </a>
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

          {/* input row */}
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

          {/* quick help / chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["help", "about", "skills", "projects", "resume", "contact", "clear"].map((c) => (
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

        {/* footer: small card summary */}
        <div className="px-5 py-3 border-t border-slate-700 bg-slate-900/70 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Tip: press <span className="font-mono text-slate-200">Tab</span> to autocomplete a command.
          </div>

          <div className="text-sm text-slate-400">
            <span className="text-slate-200 font-semibold">{personal.name}</span> • {personal.title}
          </div>
        </div>
      </div>
    </div>
  );
}
