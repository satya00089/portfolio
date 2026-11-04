import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import calendar from "../../data/github.json";

const LEVEL_COLORS = ["#e8edf1", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

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
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    date: string;
    count: number;
  } | null>(null);

  const drawFrame = useCallback((time: number, reducedMotion: boolean) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width;
    const height = rect.height;
    if (
      canvas.width !== Math.round(width * dpr) ||
      canvas.height !== Math.round(height * dpr)
    ) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const weeks = Math.ceil(calendar.counts.length / 7);
    const cell = Math.max(4, Math.min(15, (width - 64) / (weeks + 6 * 0.42)));
    const depth = cell * 0.42;
    const maxCount = Math.max(...calendar.counts, 1);
    const elapsed = reducedMotion
      ? Number.POSITIVE_INFINITY
      : time - (startTimeRef.current ?? time);
    const groundWidth = weeks * cell + 6 * depth;
    const dayStepY = cell * 0.58;
    const weekStepY = cell * 0.08;
    const groundHeight = 6 * dayStepY + weeks * weekStepY;
    const maxBuildingHeight = 140;
    const originX = (width - groundWidth) / 2 + 3 * depth;
    const originY = Math.max(185, height * 0.67 - groundHeight * 0.5);
    const waveDuration = (weeks - 1) * 6 + 6 * 26 + 520;

    // A fine street grid gives the isometric blocks a shared city ground plane.
    ctx.strokeStyle = "rgba(148, 163, 184, 0.10)";
    ctx.lineWidth = 1;
    for (let col = 0; col <= weeks; col += 4) {
      const x = originX + col * cell;
      ctx.beginPath();
      ctx.moveTo(x, originY + 4);
      ctx.lineTo(x - 6 * depth, originY + 6 * dayStepY + 4);
      ctx.stroke();
    }
    for (let row = 0; row <= 6; row += 2) {
      const x = originX - row * depth;
      const y = originY + row * dayStepY;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + weeks * cell, y + weeks * cell * 0.28);
      ctx.stroke();
    }

    const hits: Building[] = [];
    const order = calendar.counts
      .map((_, index) => index)
      .sort((a, b) => {
        const ra = a % 7;
        const rb = b % 7;
        return Math.floor(a / 7) + ra - (Math.floor(b / 7) + rb);
      });

    for (const index of order) {
      const count = calendar.counts[index];
      const level = Number(calendar.levels[index] || 0);
      const col = Math.floor(index / 7);
      const row = index % 7;
      // Start at the front edge, then lift each week and recede row by row.
      const delay = col * 6 + (6 - row) * 26;
      const progress = reducedMotion
        ? 1
        : Math.max(0, Math.min(1, (elapsed - delay) / 520));
      if (progress <= 0) continue;

      const bx = originX + col * cell - row * depth;
      const by = originY + col * weekStepY + row * dayStepY;
      const fullHeight =
        count === 0 ? 2 : 8 + Math.sqrt(count / maxCount) * maxBuildingHeight;
      const buildingHeight = Math.max(
        1,
        fullHeight * (1 - Math.pow(1 - progress, 3)),
      );
      const x0 = bx;
      const x1 = bx + cell * 0.82;
      const y0 = by - buildingHeight;
      const y1 = by;
      const front: [number, number][] = [
        [x0, y0],
        [x1, y0],
        [x1, y1],
        [x0, y1],
      ];
      const side: [number, number][] = [
        [x1, y0],
        [x1 + depth, y0 - depth * 0.48],
        [x1 + depth, y1 - depth * 0.48],
        [x1, y1],
      ];
      const top: [number, number][] = [
        [x0, y0],
        [x0 + depth, y0 - depth * 0.48],
        [x1 + depth, y0 - depth * 0.48],
        [x1, y0],
      ];
      const base = LEVEL_COLORS[level];
      const shade =
        level === 0 ? "#c9d1d9" : LEVEL_COLORS[Math.max(1, level - 1)];

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
      ctx.fillStyle = level === 0 ? "#f6f8fa" : "#a7f3bd";
      ctx.fill();

      ctx.strokeStyle =
        level === 0 ? "rgba(31,41,55,.15)" : "rgba(255,255,255,.18)";
      ctx.lineWidth = 0.7;
      ctx.stroke();
      hits.push({
        x: bx,
        y: by - buildingHeight - depth,
        date: new Date(
          Date.parse(`${calendar.start}T00:00:00Z`) + index * 86400000,
        )
          .toISOString()
          .slice(0, 10),
        count,
        index,
        points: front,
      });
    }
    // Mark the busiest day with the leader line used by contribution city views.
    const bestIndex = calendar.counts.indexOf(maxCount);
    const best = hits.find((building) => building.index === bestIndex);
    if (best && elapsed >= waveDuration - 120) {
      const topY = Math.min(...best.points.map((point) => point[1]));
      const markerX = best.x + cell * 0.4;
      const labelY = Math.max(20, topY - 34);
      ctx.strokeStyle = "#52606d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(markerX, topY - 2);
      ctx.lineTo(markerX, labelY + 7);
      ctx.stroke();
      ctx.fillStyle = "#24292f";
      ctx.font = "600 14px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${maxCount} contributions`, markerX + 7, labelY);
      ctx.fillStyle = "#6e7781";
      ctx.font = "9px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(
        `${formatDate(best.date).toUpperCase()} · BEST DAY`,
        markerX + 7,
        labelY + 13,
      );
    }
    buildingsRef.current = hits;

    if (!reducedMotion && elapsed < waveDuration) {
      frameRef.current = requestAnimationFrame((nextTime) =>
        drawFrame(nextTime, reducedMotion),
      );
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (time: number) => drawFrame(time, motionQuery.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (startTimeRef.current === null)
            startTimeRef.current = performance.now();
          if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
          frameRef.current = requestAnimationFrame(draw);
        } else if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      },
      { threshold: 0.4 },
    );
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
      return (
        x >= Math.min(...xs) &&
        x <= Math.max(...xs) &&
        y >= Math.min(...ys) &&
        y <= Math.max(...ys)
      );
    });
    setTooltip(
      hit
        ? {
            x: Math.min(x + 14, rect.width - 150),
            y: Math.max(8, y - 44),
            date: hit.date,
            count: hit.count,
          }
        : null,
    );
  };

  const total = calendar.total.toLocaleString();

  return (
    <section
      aria-labelledby="github-city-title"
      className="github-city-section py-12 sm:py-16"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6e7781]">
            04 · GitHub activity
          </p>
          <h2
            id="github-city-title"
            className="font-serif text-3xl font-medium text-[#24292f] sm:text-4xl"
          >
            As a city
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#57606a]">
            Every day becomes a building, as tall as that day’s commits. The
            city rises from front to back, then points at my biggest day.
          </p>
        </div>
        <div className="flex items-baseline gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <span className="text-2xl font-bold text-[var(--text)]">{total}</span>
          <span className="text-xs text-[var(--muted)]">
            contributions this year
          </span>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-[#e1e4e8] bg-[#fafafa] px-2 py-4 sm:px-5 sm:py-6">
        <canvas
          ref={canvasRef}
          aria-label={`Animated 3D city of ${calendar.counts.length} daily GitHub contribution counts for ${calendar.username}. Hover over a building to see its date and contribution count.`}
          role="img"
          className="block h-[290px] w-full touch-pan-y sm:h-[380px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setTooltip(null)}
        />
        {tooltip && (
          <div
            className="pointer-events-none absolute z-10 rounded-lg border border-[#d0d7de] bg-white px-3 py-2 text-xs text-[#24292f] shadow-xl"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <span className="block font-medium">
              {formatDate(tooltip.date)}
            </span>
            <span className="text-[#57606a]">
              {tooltip.count}{" "}
              {tooltip.count === 1 ? "contribution" : "contributions"}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 text-xs text-[var(--muted)]">
        <span>Daily activity · GitHub contribution calendar</span>
        <button
          type="button"
          className="rounded-md px-2 py-1 transition hover:bg-[var(--surface)] hover:text-[var(--text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
          onClick={() => {
            startTimeRef.current = null;
            setReplay((value) => value + 1);
          }}
        >
          Replay city
        </button>
      </div>
    </section>
  );
}
