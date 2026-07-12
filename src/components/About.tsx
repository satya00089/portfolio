import { animate, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PORTFOLIO_INFO } from "../config/portfolioData";
import type { AvatarItem } from "../types/portfolio";

// Senior-level hero: polished two-column layout with staggered entrances,
// animated feature bullets, strong CTAs, and a floating avatar emblem.
export const About: React.FC = () => {
  const personal = PORTFOLIO_INFO.personal;
  const name = personal.name ?? "Your Name";
  const avatar = personal.avatar;
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

  const features = useMemo(() => PORTFOLIO_INFO.highlights ?? [], []);
  const heroSummary =
    personal.hero?.summary ??
    personal.summary ??
    "I design and build production-grade frontends and APIs, focusing on performance, accessibility, and delightful UX.";

  const container = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Coverflow carousel items
  // Support avatar being:
  // - a single string URL
  // - a single object { url, label }
  // - an array of the above
  // Normalize AvatarItem (string | {url,label}) into a consistent object shape
  const normalizeAvatar = (a: AvatarItem) =>
    typeof a === "string" ? { url: a } : { url: a.url, label: a.label };

  let avatarItems: { url: string; label?: string }[] = [];
  if (Array.isArray(avatar)) {
    avatarItems = avatar.map((a) => normalizeAvatar(a));
  } else if (avatar) {
    avatarItems = [normalizeAvatar(avatar)];
  }

  const carouselItems =
    avatarItems.length > 0
      ? avatarItems.map((it, idx) => ({
          id: idx,
          image: it.url || "/placeholder-1.jpg",
          label: it.label ?? `Image ${idx + 1}`,
        }))
      : [{ id: 1, image: "/placeholder-1.jpg", label: "Profile" }];

  const springScrollTo = (y: number) => {
    const controls = animate(window.scrollY, y, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
    return () => controls.stop();
  };

  const navigateTo = (href: string) => {
    if (!href.startsWith("#")) {
      // external or file link — use location assign
      globalThis.location.href = href;
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const headerEl = document.querySelector("header");
    const headerH = headerEl?.offsetHeight ?? 0;
    const y = target.getBoundingClientRect().top + window.scrollY - headerH;
    springScrollTo(y);
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return; // allow default for external links
    e.preventDefault();
    navigateTo(href);
  };

  const handleKeyActivation = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // support Enter and Space activating the anchor for keyboard users
    if (e.key === "Enter") {
      // for internal anchors, prevent default and animate scroll
      if (href.startsWith("#")) {
        e.preventDefault();
        navigateTo(href);
      }
      // else allow default (Enter will follow the link)
    } else if (e.key === " " || e.key === "Spacebar") {
      // Space should activate links like a button; prevent page scroll
      e.preventDefault();
      navigateTo(href);
    }
  };

  return (
    <section className="w-full">
      <div className="w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-7xl mx-auto"
        >
          {/* Left: Headline + features + CTAs */}
          <motion.div variants={item} className="md:col-span-7">
              <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight flex items-center gap-3">
                  {name}
                </h1>

                {personal.title && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    {personal.title}
                  </div>
                )}

                <motion.p
                  variants={item}
                  className="mt-6 text-lg text-muted-foreground max-w-2xl"
                >
                  {heroSummary}
                </motion.p>

                <motion.ul
                  variants={item}
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg
                        className="mt-1 w-5 h-5 text-foreground/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M5 12l4 4L19 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={item}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-5 py-3 text-sm font-semibold shadow-lg hover:opacity-95"
                    onClick={(e) => onNavClick(e, "#projects")}
                    onKeyDown={(e) => handleKeyActivation(e, "#projects")}
                  >
                    See my work
                  </a>

                  <a
                    href={resumeHref}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted"
                    onKeyDown={(e) => handleKeyActivation(e, resumeHref)}
                  >
                    Download resume
                  </a>
                </motion.div>
              </div>
          </motion.div>

          {/* Right: Coverflow carousel */}
          <motion.div
            variants={item}
            className="md:col-span-5 flex items-center justify-center overflow-visible"
          >
            <div
              className="relative w-full h-100 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative h-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {carouselItems.map((item, index) => {
                  const offset = index - activeIndex;
                  const isActive = index === activeIndex;
                  const absOffset = Math.abs(offset);

                  return (
                    <motion.div
                      key={item.id}
                      className="absolute cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                      animate={{
                        x: offset * 140,
                        z: isActive ? 0 : -100,
                        scale: isActive ? 1 : 0.75,
                        rotateY: offset * -35,
                        opacity: absOffset > 1 ? 0 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      onClick={() => setActiveIndex(index)}
                    >
                      <div className="w-72 h-96 rounded-xl overflow-hidden shadow-2xl bg-muted ring-2 ring-border/20">
                        {item.image && !item.image.includes("/placeholder") ? (
                          <img
                            src={item.image}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-600 text-white">
                            <div className="text-6xl font-bold mb-4">
                              {name?.[0] ?? "S"}
                            </div>
                            <div className="text-sm font-medium opacity-80">
                              {item.label}
                            </div>
                          </div>
                        )}
                      </div>

                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-foreground whitespace-nowrap"
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation arrows (only when multiple images) */}
              {carouselItems.length > 1 && (
                <>
                  <button
                    className="absolute left-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur shadow-lg flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30"
                    onClick={() =>
                      setActiveIndex((prev) => Math.max(0, prev - 1))
                    }
                    disabled={activeIndex === 0}
                    aria-label="Previous slide"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    className="absolute right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur shadow-lg flex items-center justify-center hover:bg-background transition-colors disabled:opacity-30"
                    onClick={() =>
                      setActiveIndex((prev) =>
                        Math.min(carouselItems.length - 1, prev + 1),
                      )
                    }
                    disabled={activeIndex === carouselItems.length - 1}
                    aria-label="Next slide"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Navigation dots (only when multiple images) */}
            {carouselItems.length > 1 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                {carouselItems.map((item, index) => (
                  <button
                    key={item.id}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "bg-foreground w-8"
                        : "bg-foreground/30 hover:bg-foreground/50 w-2"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
