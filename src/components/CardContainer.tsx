"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import { cn } from "../lib/utils"
import { MouseEnterContext, useMouseEnter } from "./hooks/mouseEnter"

export interface CardContainerProps {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  href?: string
  onActivate?: () => void
}

export const CardContainer = ({
  children,
  className,
  containerClassName,
  href,
  onActivate,
}: CardContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return
    }
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    setIsMouseEntered(false)
    if (containerRef.current) {
      containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)"
    }
  }

  const handleClick = () => {
    if (onActivate) {
      onActivate()
      return
    }
    if (href) {
      window.open(href, "_blank")
    }
  }

  const contextValue = useMemo(() => [isMouseEntered, setIsMouseEntered] as const, [isMouseEntered])

  return (
    <MouseEnterContext.Provider value={contextValue}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className,
          )}
          tabIndex={0}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            // Activate on Enter or Space for accessibility
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleClick()
            }
          }}
          ref={containerRef}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export type CardItemProps = {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
} & Record<string, unknown>

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) => {
  const ref = useRef<HTMLElement | null>(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    handleAnimations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseEntered])

  const handleAnimations = () => {
    if (!ref.current) {
      return
    }
    const fmt = (v: number | string) => (typeof v === "number" ? `${v}px` : String(v ?? "0"))
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${fmt(translateX)}) translateY(${fmt(
        translateY,
      )}) translateZ(${fmt(translateZ)}) rotateX(${fmt(rotateX)}) rotateY(${fmt(rotateY)}) rotateZ(${fmt(
        rotateZ,
      )})`
    } else {
      ref.current.style.transform =
        "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
    }
  }

  return React.createElement(
    Tag,
    {
      ref,
      className: cn("w-fit transition duration-200 ease-linear", className),
      ...rest,
    },
    children,
  )
}
