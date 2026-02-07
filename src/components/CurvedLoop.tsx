"use client";

import {
  type FC,
  type PointerEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = "well come!",
  speed = 2,
  className = "",
  curveAmount = 400,
  direction = "left",
  interactive = true,
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return `${hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText}\u00A0`;
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<"left" | "right">(direction);
  const velRef = useRef(0);
  const animationRef = useRef<number>(0);

  // Calculate how many repetitions we need with some buffer
  const repetitions = spacing > 0 ? Math.ceil(2000 / spacing) + 3 : 1;
  const totalText = new Array(repetitions).fill(text).join("");
  const ready = spacing > 0;

  useEffect(() => {
    // Force a re-measure after a brief delay to ensure styles are applied
    const measure = () => {
      if (measureRef.current) {
        const length = measureRef.current.getComputedTextLength();
        setSpacing(length);
      }
    };

    measure();
    // Re-measure after styles settle
    const timer = setTimeout(measure, 50);
    return () => clearTimeout(timer);
  }, [text, className]);

  useEffect(() => {
    if (!spacing) {
      return;
    }
    if (textPathRef.current) {
      const initial = 0;
      textPathRef.current.setAttribute("startOffset", `${initial}px`);
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!(spacing && ready)) {
      return;
    }

    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === "right" ? speed : -speed;
        const currentOffset = Number.parseFloat(
          textPathRef.current.getAttribute("startOffset") || "0",
        );
        let newOffset = currentOffset + delta;

        // Wrap the offset to create seamless loop
        const wrapPoint = spacing;
        if (dirRef.current === "left") {
          if (newOffset <= -wrapPoint) {
            newOffset += wrapPoint;
          }
        } else if (newOffset >= wrapPoint) {
          newOffset -= wrapPoint;
        }

        textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
        setOffset(newOffset);
      }
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) {
      return;
    }
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!(interactive && dragRef.current && textPathRef.current)) {
      return;
    }
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = Number.parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0",
    );
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) {
      newOffset += wrapPoint;
    }
    if (newOffset >= wrapPoint) {
      newOffset -= wrapPoint;
    }

    textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) {
      return;
    }
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? "right" : "left";
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="w-full flex items-center justify-center"
      onPointerDown={onPointerDown}
      onPointerLeave={endDrag}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      style={{
        visibility: ready ? "visible" : "hidden",
        cursor: cursorStyle,
      }}
    >
      <svg
        aria-label="Curved text"
        className="select-none w-full overflow-visible block aspect-[100/12] font-bold uppercase leading-none"
        role="img"
        viewBox="0 0 1440 120"
      >
        {/* Measurement text - apply same className to ensure accurate measurement */}
        <text
          className={`fill-current ${className}`}
          ref={measureRef}
          style={{
            visibility: "hidden",
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
          }}
          xmlSpace="preserve"
        >
          {text}
        </text>

        <defs>
          <path
            d={pathD}
            fill="none"
            id={pathId}
            ref={pathRef}
            stroke="transparent"
          />
        </defs>

        {ready && (
          <text className={`fill-current ${className}`} xmlSpace="preserve">
            <textPath
              href={`#${pathId}`}
              ref={textPathRef}
              startOffset={`${offset}px`}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
