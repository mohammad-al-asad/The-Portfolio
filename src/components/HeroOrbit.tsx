"use client";

import { useEffect, useRef, useState } from "react";
import { SOCIAL_LINKS } from "@/lib/socials";

// Brand colour each icon takes on hover
const HOVER: Record<string, string> = {
  GitHub: "group-hover:bg-gray-500 group-hover:border-gray-500",
  LinkedIn: "group-hover:border-blue-500 group-hover:bg-blue-500",
  Instagram:
    "group-hover:border-none hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
  Facebook: "group-hover:border-blue-500 group-hover:bg-blue-500",
  X: "dark:group-hover:border-white hover:border-black group-hover:bg-black",
};

// The same look while the orbiting light passes over an icon
const LIT: Record<string, string> = {
  GitHub: "bg-gray-500 border-gray-500",
  LinkedIn: "bg-blue-500 border-blue-500",
  Instagram: "border-transparent bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  Facebook: "bg-blue-500 border-blue-500",
  X: "bg-black border-black dark:border-white",
};

const SPREAD = 128; // degrees of the orbit covered by the icons
const ANGLES = SOCIAL_LINKS.map(
  (_, i) => -SPREAD / 2 + (i * SPREAD) / (SOCIAL_LINKS.length - 1)
);

// Keep in sync with .hero-arc-light in globals.css
const LIGHT_PERIOD_MS = 8000;
const LIGHT_DELAY_MS = 1800;
const LIGHT_LENGTH = 18; // degrees
const LIGHT_START = 78; // starts at the bottom end of the line, then runs up the left side
const LIT_RANGE = 9; // how close (degrees) the light must be to light an icon

export default function HeroOrbit() {
  const lightRef = useRef<SVGCircleElement>(null);
  const [lit, setLit] = useState<number | null>(null);

  useEffect(() => {
    const el = lightRef.current;
    if (!el || typeof el.getAnimations !== "function") return;

    // Read the light's own animation clock so the icons stay exactly in step with it
    const id = window.setInterval(() => {
      const anim = el
        .getAnimations()
        .find((a) => (a as CSSAnimation).animationName === "hero-arc-light");
      const time = Number(anim?.currentTime ?? -1) - LIGHT_DELAY_MS;
      if (!anim || time < 0) return setLit(null);

      // Angles run clockwise from 3 o'clock, like CSS rotate(); this is the light's centre
      const head = (LIGHT_START + ((time % LIGHT_PERIOD_MS) / LIGHT_PERIOD_MS) * 360 + LIGHT_LENGTH / 2) % 360;
      const index = ANGLES.findIndex((a) => {
        const diff = Math.abs((((head - a) % 360) + 540) % 360 - 180);
        return diff < LIT_RANGE;
      });
      setLit(index === -1 ? null : index);
    }, 40);

    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {/* Orbit line on the empty left side, plus a light that travels the whole circle */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible"
        style={{ width: "calc(var(--r) * 2)", height: "calc(var(--r) * 2)" }}
      >
        <defs>
          <linearGradient id="hero-arc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="0.25" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="0.75" stopColor="#a855f7" stopOpacity="0.7" />
            <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Circle path starts at 3 o'clock and runs clockwise; draw 78° to 282°,
            the side opposite the icons (which sit between -64° and 64°) */}
        <circle
          cx="100"
          cy="100"
          r="100"
          fill="none"
          stroke="url(#hero-arc)"
          strokeWidth="0.9"
          strokeLinecap="round"
          pathLength="360"
          strokeDasharray="204 156"
          strokeDashoffset="-78"
          className="hero-arc-draw"
        />
        <circle
          ref={lightRef}
          cx="100"
          cy="100"
          r="100"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="2.6"
          strokeLinecap="round"
          pathLength="360"
          strokeDasharray={`${LIGHT_LENGTH} ${360 - LIGHT_LENGTH}`}
          strokeDashoffset={-LIGHT_START}
          className="hero-arc-light"
        />
      </svg>

      {/* Social icons on a half orbit along the right side, leaving the photo clear */}
      {SOCIAL_LINKS.map(({ label, href, Icon }, index) => {
        const angle = ANGLES[index];
        const isLit = lit === index;

        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 top-1/2 z-20 group animate-orbit-spread"
            // All icons start stacked on the bottom one and fan out up the arc
            style={
              {
                "--orbit-start": `${SPREAD / 2}deg`,
                "--orbit-end": `${angle}deg`,
                "--orbit-angle": `${angle}deg`,
                transform:
                  "translate(-50%, -50%) rotate(var(--orbit-angle)) translateX(var(--r)) rotate(calc(-1 * var(--orbit-angle)))",
              } as React.CSSProperties
            }
            aria-label={label}
          >
            <span
              className={`w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center backdrop-blur-sm border-2 rounded-full text-xl transition-all duration-500 shadow-lg hover:shadow-xl ${
                isLit
                  ? `${LIT[label] ?? ""} scale-110 text-white shadow-xl`
                  : `bg-background/80 border-blue-400/30 text-foreground group-hover:scale-110 group-hover:text-white ${HOVER[label] ?? ""}`
              }`}
            >
              <Icon className="size-4 lg:size-5" />
            </span>
          </a>
        );
      })}
    </>
  );
}
