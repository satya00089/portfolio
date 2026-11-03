import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import calendar from "../../data/github.json";

const LEVEL_COLORS = ["#253044", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

type Building = {
  x: number;
  y: number;
  date: string;
  count: number;
  index: number;
  points: [number, number][];
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export function GitHubCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buildingsRef = useRef<Building[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const [replay, setReplay] = useState(0);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; count: number } | null>(null);

  const drawFrame = useCallback((time: number, reducedMotion: boolean) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width;
    const height = rect.height;
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const weeks = Math.ceil(calendar.counts.length / 7);
    const cell = Math.min(14, (width - 52) / (weeks + 3.5));
    const depth = cell * 0.38;
    const maxCount = Math.max(...calendar.counts, 1);
    const elapsed = reducedMotion ? Number.POSITIVE_INFINITY : time - (startTimeRef.current ?? time);
    const riseDuration = 1050;
    const lift = Math.max(0, Math.min(1, elapsed / riseDuration));
    const easedLift = 1 - Math.pow(1 - lift, 3);
    const groundWidth = weeks * cell + 6 * depth;
    const groundHeight = 6 * cell * 0.72 + weeks * cell * 0.28;
    const originX = (width - groundWidth) / 2 + 2 * depth;
    const originY = Math.max(42, (height - groundHeight - 92) / 2) + 6 * cell * 0.72 + 24;

    // A fine street grid gives the isometric blocks a shared city ground plane.
    ctx.strokeStyle = "rgba(148, 163, 184, 0.10)";
    ctx.lineWidth = 1;
    for (let col = 0; col <= weeks; col += 4) {
      const x = originX + col * cell;
      ctx.beginPath();
      ctx.moveTo(x, originY + 4);
      ctx.lineTo(x - 6 * depth, originY + 6 * cell * 0.72 + 4);
      ctx.stroke();
    }
    for (let row = 0; row <= 6; row += 2) {
      const x = originX - row * depth;
      const y = originY + row * cell * 0.72;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + weeks * cell, y + weeks * cell * 0.28);
      ctx.stroke();
    }

    const hits: Building[] = [];
    const order = calendar.counts.map((_, index) => index).sort((a, b) => {
      const ra = a % 7;
      const rb = b % 7;
      return (Math.floor(a / 7) + ra) - (Math.floor(b / 7) + rb);
    });

    for (const index of order) {
      const count = calendar.counts[index];
      const level = Number(calendar.levels[index] || 0);
      const col = Math.floor(index / 7);
      const row = index % 7;
      const delay = (col * 8 + row * 15) * 2.1;
      const progress = reducedMotion ? 1 : Math.max(0, Math.min(1, (elapsed - delay) / 440));
      if (progress <= 0) continue;

      const bx = originX + col * cell - row * depth;
      const by = originY + col * cell * 0.28 + row * cell * 0.72;
      const fullHeight = count === 0 ? 2 : 7 + Math.sqrt(count / maxCount) * 94;
      const buildingHeight = Math.max(1, fullHeight * easedLift * (1 - Math.pow(1 - progress, 3)));
      const x0 = bx;
      const x1 = bx + cell * 0.82;
      const y0 = by - buildingHeight;
      const y1 = by;
      const front: [number, number][] = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
      const side: [number, number][] = [[x1, y0], [x1 + depth, y0 - depth * 0.48], [x1 + depth, y1 - depth * 0.48], [x1, y1]];
      const top: [number, number][] = [[x0, y0], [x0 + depth, y0 - depth * 0.48], [x1 + depth, y0 - depth * 0.48], [x1, y0]];
      const base = LEVEL_COLORS[level];
      const shade = level === 0 ? "#1b2333" : LEVEL_COLORS[Math.max(1, level - 1)];

      ctx.beginPath();
      ctx.moveTo(...side[0]);
      side.slice(1).forEach((point) => ctx.lineTo(...point));
      ctx.closePath();
      ctx.fillStyle = shade;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(...front[0]);
      front.slice(1).forEach((point) => ctx.lineTo(...point));
      ctx.closePath();
      ctx.fillStyle = base;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(...top[0]);
      top.slice(1).forEach((point) => ctx.lineTo(...point));
      ctx.closePath();
      ctx.fillStyle = level === 0 ? "#384254" : "#a7f3bd";
      ctx.fill();

      ctx.strokeStyle = level === 0 ? "rgba(148,163,184,.15)" : "rgba(255,255,255,.13)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
      hits.push({ x: bx, y: by - buildingHeight - depth, date: new Date(Date.parse(`${calendar.start}T00:00:00Z`) + index * 86400000).toISOString().slice(0, 10), count, index, points: front });
    }
    buildingsRef.current = hits;

    if (!reducedMotion && lift < 1) {
      frameRef.current = requestAnimationFrame((nextTime) => drawFrame(nextTime, reducedMotion));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (time: number) => drawFrame(time, motionQuery.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting) {
        if (startTimeRef.current === null) startTimeRef.current = performance.now();
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(draw);
      } else if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }, { threshold: 0.4 });
    observer.observe(canvas);
    const resize = new ResizeObserver(() => {
      if (visibleRef.current) {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = requestAnimationFrame(draw);
      }
    });
    resize.observe(canvas);
    return () => {
      observer.disconnect();
      resize.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [drawFrame, replay]);

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const hit = [...buildingsRef.current].reverse().find(({ points }) => {
      const xs = points.map((point) => point[0]);
      const ys = points.map((point) => point[1]);
      return x >= Math.min(...xs) && x <= Math.max(...xs) && y >= Math.min(...ys) && y <= Math.max(...ys);
    });
    setTooltip(hit ? { x: Math.min(x + 14, rect.width - 150), y: Math.max(8, y - 44), date: hit.date, count: hit.count } : null);
  };

  const total = calendar.total.toLocaleString();

  return (
    <section aria-labelledby="github-city-title" className="github-city-section py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">A year of building</p>
          <h2 id="github-city-title" className="text-2xl font-semibold text-[var(--brand)] sm:text-3xl">My GitHub city</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">Each building is a day of code. Taller, greener towers mark busier days.</p>
        </div>
        <div className="flex items-baseline gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <span className="text-2xl font-bold text-[var(--text)]">{total}</span>
          <span className="text-xs text-[var(--muted)]">contributions this year</span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[#0b1020] px-2 py-4 sm:px-5 sm:py-6">
        <canvas
          ref={canvasRef}
          aria-label={`Animated 3D city of ${calendar.counts.length} daily GitHub contribution counts for ${calendar.username}. Hover over a building to see its date and contribution count.`}
          role="img"
          className="block h-[330px] w-full touch-pan-y sm:h-[390px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setTooltip(null)}
        />
        {tooltip && (
          <div className="pointer-events-none absolute z-10 rounded-lg border border-white/10 bg-[#171d2d] px-3 py-2 text-xs text-white shadow-xl" style={{ left: tooltip.x, top: tooltip.y }}>
            <span className="block font-medium">{formatDate(tooltip.date)}</span>
            <span className="text-slate-300">{tooltip.count} {tooltip.count === 1 ? "contribution" : "contributions"}</span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <span>Daily activity · GitHub contribution calendar</span>
        <button type="button" className="rounded-md px-2 py-1 transition hover:bg-[var(--surface)] hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]" onClick={() => { startTimeRef.current = null; setReplay((value) => value + 1); }}>
          Replay city
        </button>
      </div>
    </section>
  );
}
