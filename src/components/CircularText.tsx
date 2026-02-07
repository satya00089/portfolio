"use client"

import { motion, type Transition, useAnimation } from "framer-motion"
import type React from "react"
import { useEffect, useState } from "react"

interface CircularTextProps {
  text: string
  spinDuration?: number
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers"
  className?: string
  children?: React.ReactNode
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: "linear" as const,
  duration,
  type: "tween" as const,
  repeat: loop ? Number.POSITIVE_INFINITY : 0,
})

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring" as const,
    damping: 20,
    stiffness: 300,
  },
})

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
  children,
}) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const [showCenter, setShowCenter] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    // detect prefers-reduced-motion and update state
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      const handle = () => setReduceMotion(Boolean(mq.matches))
      handle()
      if (mq.addEventListener) mq.addEventListener("change", handle)
      else mq.addListener(handle)
      return () => {
        if (mq.removeEventListener) mq.removeEventListener("change", handle)
        else mq.removeListener(handle)
      }
    } catch {
      // SSR safety: window might not be available; ignore
    }

  const start = 0
    if (reduceMotion) {
      // when reduced motion is preferred, don't animate rotation — keep static
      controls.set({ rotate: start, scale: 1 })
      return
    }

    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }, [spinDuration, text, onHover, controls, reduceMotion])

  // Persist center once shown; do not auto-hide after interaction per user request.

  const handleHoverStart = () => {
  const start = 0

    if (!onHover) {
      return
    }

    let transitionConfig: ReturnType<typeof getTransition> | Transition
    let scaleVal = 1

    switch (onHover) {
      case "slowDown":
        transitionConfig = getTransition(spinDuration * 2, start)
        break
      case "speedUp":
        transitionConfig = getTransition(spinDuration / 4, start)
        break
      case "pause":
        transitionConfig = {
          rotate: { type: "spring", damping: 20, stiffness: 300 },
          scale: { type: "spring", damping: 20, stiffness: 300 },
        }
        break
      case "goBonkers":
        transitionConfig = getTransition(spinDuration / 20, start)
        scaleVal = 0.8
        break
      default:
        transitionConfig = getTransition(spinDuration, start)
    }

    if (reduceMotion) {
      // only animate scale when reduced-motion is set
      controls.start({ scale: scaleVal, transition: transitionConfig as unknown as Transition })
      return
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig,
    })
  }

  const handleHoverEnd = () => {
  const start = 0
    if (reduceMotion) {
      controls.start({ scale: 1, transition: { type: "spring", damping: 20, stiffness: 300 } as unknown as Transition })
      return
    }

    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start),
    })
  }

  return (
    <div
      className={`m-0 mx-auto rounded-full w-[260px] h-[260px] relative font-black text-foreground text-center cursor-pointer origin-center ${className}`}
      onPointerEnter={() => {
        handleHoverStart()
        // show and persist the center content (do not hide on leave)
        setShowCenter(true)
      }}
      onPointerMove={() => {
        // show on pointer move and persist
        setShowCenter(true)
      }}
      onPointerLeave={() => {
        // maintain rotation behavior but keep center visible
        handleHoverEnd()
        setShowCenter(true)
      }}
    >
      {/* circular underline (single stroke following the ring) */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 260 260"
        aria-hidden
        focusable="false"
      >
        <circle
          cx="130"
          cy="130"
          r="98"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* rotating ring - keep animation local so center children stay static */}
      <motion.div
        animate={controls}
        initial={{ rotate: 0 }}
        className="absolute inset-0 z-10"
        aria-hidden
      >
        {letters.map((letter, i) => {
          const rotationDeg = (360 / letters.length) * i
          const factor = Math.PI / letters.length
          const x = factor * i
          const y = factor * i
          const transform = `rotateZ(${rotationDeg}deg) translate3d(${x}px, ${y}px, 0)`

          return (
            <span
              className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
              key={`${letter}-${i}`}
              style={{ transform, WebkitTransform: transform }}
            >
              {letter}
            </span>
          )
        })}
      </motion.div>

      {/* static center content - shown only when interacting */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-center transition-all duration-400 ease-out ${
            showCenter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default CircularText