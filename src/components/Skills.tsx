"use client";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/SectionHeader";

const skills = [
  { name: "TypeScript", level: 90 },
  { name: "React", level: 92 },
  { name: "Next.js", level: 88 },
  { name: "Node.js", level: 85 },
  { name: "React Native", level: 93 },
  { name: "MongoDB", level: 80 },
];

export default function Skills() {
  // Fill the bars the first time the section scrolls into view (plain CSS transition)
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref}>
      <SectionHeader
        title="Technical Expertise"
        subtitle="The tools I reach for every day"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="glow-edge bg-white text-foreground dark:bg-card/70 border border-gray-200 dark:border-white/10 rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">{skill.name}</span>
              <Badge variant="secondary">{skill.level}%</Badge>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full dark:shadow-[0_0_14px_oklch(0.62_0.22_290/0.7)] transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                style={{ width: visible ? `${skill.level}%` : "1%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
