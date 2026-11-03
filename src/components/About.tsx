import { BookOpen, Briefcase, GraduationCap, Languages } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

// What I'm doing right now; update these lines as things change
const NOW = [
  {
    icon: Briefcase,
    label: "Working",
    text: "React Native Developer at Spark Tech Agency",
    detail: "Since Dec 2025",
  },
  {
    icon: GraduationCap,
    label: "Studying",
    text: "BSc in Computer Science & Engineering, Northern University Bangladesh",
    detail: "1st year, from Sep 2026",
  },
  {
    icon: BookOpen,
    label: "Learning",
    text: "Statistics and probability, on the way to neural networks and NLP",
    detail: "After calculus and linear algebra",
  },
  {
    icon: Languages,
    label: "English",
    text: "IELTS Academic 6.5 overall (CEFR B2)",
    detail: "Listening 7.0 · Reading 6.5 · Speaking 6.5 · Writing 6.0",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeader title="About Me" subtitle="A little about me, and what I'm up to now" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="surface p-6 md:p-8 lg:col-span-2 space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I&apos;m <strong className="text-foreground">Mohammad Al Asad</strong> (M.A. Asad), a
            React Native and full-stack developer from Feni, Bangladesh.
          </p>
          <p>
            I like owning a product end to end: the mobile app, the API and database behind
            it, the admin dashboard, the deployment, and finally the store listing. Apps I
            built that way, like Body Axis and Fitco, are live on both the App Store and
            Google Play.
          </p>
          <p>
            I finished a four-year Diploma in Computer Science (CGPA 3.61/4) and am now
            working towards my BSc.
          </p>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NOW.map(({ icon: Icon, label, text, detail }) => (
            <div key={label} className="surface p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                <Icon className="h-4 w-4" />
                {label}
              </div>
              <p className="mt-2 font-medium text-gray-900 dark:text-white">{text}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
