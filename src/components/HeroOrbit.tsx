"use client";

import { useEffect, useRef } from "react";
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

// The same look while the orbiting light passes over an icon (drawn as an overlay that fades in)
const LIT: Record<string, string> = {
  GitHub: "bg-gray-500 border-gray-500",
  LinkedIn: "bg-blue-500 border-blue-500",
  // No border at all, exactly like the hover state (a transparent border leaves a faint ring)
  Instagram:
    "border-none bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  Facebook: "bg-blue-500 border-blue-500",
  X: "bg-black border-black dark:border-white",
};

// Colour of the water-ripple rings each icon sends out when the light reaches it
const RIPPLE: Record<string, string> = {
  GitHub: "border-gray-500",
  LinkedIn: "border-blue-500",
  Instagram: "border-pink-500",
  Facebook: "border-blue-500",
  X: "border-foreground",
};

const SPREAD = 128; // degrees of the orbit covered by the icons
const ANGLES = SOCIAL_LINKS.map(
  (_, i) => -SPREAD / 2 + (i * SPREAD) / (SOCIAL_LINKS.length - 1),
);

// Keep in sync with .hero-arc-light in globals.css
const LIGHT_PERIOD_S = 8;
const LIGHT_DELAY_S = 1.8;
const LIGHT_LENGTH = 9; // degrees: shorter than an icon, so it hides fully behind each one
const LIGHT_START = 78; // starts at the bottom end of the line, then runs up the left side
const LIT_RANGE = 9; // how close (degrees) the light must be to light an icon

// The light laps at a constant speed, so the moment it reaches each icon is
// known up front. Each icon's glow and ripple is a CSS animation with the same
// period, delayed to that moment: no timers, no re-renders, all on the GPU.
const litDelay = (angle: number) => {
  const startAngle = angle - LIT_RANGE - LIGHT_LENGTH / 2 - LIGHT_START;
  const fraction = (((startAngle % 360) + 360) % 360) / 360;
  return `${(LIGHT_DELAY_S + fraction * LIGHT_PERIOD_S).toFixed(3)}s`;
};

export default function HeroOrbit() {
  const ref = useRef<HTMLDivElement>(null);

  // Pause every hero animation while the hero is off screen
  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.toggleAttribute("data-motion-paused", !entry.isIntersecting);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="contents">
      {/* Orbit line on the empty left side (drawn once on load) */}
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
      </svg>

      {/* The travelling light: a fixed dash on its own layer, spun with a CSS
          transform (GPU-composited, nothing is redrawn). The wide faint stroke
          underneath gives the glow without a costly filter. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2"
        style={{
          width: "calc(var(--r) * 2)",
          height: "calc(var(--r) * 2)",
          margin: "calc(var(--r) * -1) 0 0 calc(var(--r) * -1)",
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="hero-arc-light h-full w-full overflow-visible"
        >
          {[
            { width: 7, opacity: 0.25 },
            { width: 2.6, opacity: 1 },
          ].map(({ width, opacity }) => (
            <circle
              key={width}
              cx="100"
              cy="100"
              r="100"
              fill="none"
              stroke="#a78bfa"
              strokeOpacity={opacity}
              strokeWidth={width}
              strokeLinecap="round"
              pathLength="360"
              strokeDasharray={`${LIGHT_LENGTH} ${360 - LIGHT_LENGTH}`}
              strokeDashoffset={-LIGHT_START}
            />
          ))}
        </svg>
      </div>

      {/* Social icons on a half orbit along the right side, leaving the photo clear */}
      {SOCIAL_LINKS.map(({ label, href, Icon }, index) => {
        const angle = ANGLES[index];
        const delay = litDelay(angle);

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
            {/* Water ripple: two rings spreading out each time the light arrives */}
            {[0, 0.22].map((offset) => (
              <span
                key={offset}
                aria-hidden
                className={`icon-ripple pointer-events-none absolute inset-0 rounded-full border-2 ${RIPPLE[label] ?? ""}`}
                style={{ animationDelay: `calc(${delay} + ${offset}s)` }}
              />
            ))}
            <span
              className="icon-lit-scale relative block"
              style={{ animationDelay: delay }}
            >
              <span
                className={`relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border-2 rounded-full text-xl shadow-lg bg-background/90 border-blue-400/30 text-foreground transition-[transform,background-color,border-color,color] duration-500 group-hover:scale-110 group-hover:text-white ${HOVER[label] ?? ""}`}
              >
                <Icon className="size-4 lg:size-5" />
                {/* Lit look, faded in by opacity only while the light passes */}
                <span
                  aria-hidden
                  className={`icon-lit absolute -inset-[2px] flex items-center justify-center rounded-full border-2 text-white ${LIT[label] ?? ""}`}
                  style={{ animationDelay: delay }}
                >
                  <Icon className="size-4 lg:size-5" />
                </span>
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
