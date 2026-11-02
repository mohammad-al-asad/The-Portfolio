import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

export default function Hero({ resumeUrl }: { resumeUrl?: string | null }) {
  return (
    <section className="pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">
          {/* Text Content Side: CSS fade starts on first paint (no JS wait) */}
          <div className="text-center lg:text-left order-1 animate-in fade-in duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Crafting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Digital Experiences
              </span>{" "}
              That Inspire
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
              Full-stack & React Native developer building fast, polished apps
              for mobile and the web, from the first idea to the store listing.
            </p>
            <div className="flex flex-col justify-center lg:justify-start sm:flex-row gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/projects">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              {resumeUrl && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download CV <Download className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Image Side */}
          {/* Shifted left a little on phones so the icon arc on the right stays on screen */}
          <div className="relative order-2 flex justify-center animate-in fade-in duration-1000 -translate-x-6 sm:translate-x-0">
            {/* --r: how far the icon arc sits from the photo's centre, leaving a clear gap from the frame */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 [--r:178px] sm:[--r:194px] lg:[--r:232px]">
              {/* Soft glow behind the whole frame: photo and icon arc */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-16 sm:-inset-20 -z-20 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),rgba(147,51,234,0.16)_55%,transparent)] blur-2xl animate-pulse-slow"
              />

              {/* Social icons on a half orbit along the right side, leaving the photo clear */}
              {SOCIAL_LINKS.map(({ label, href, Icon }, index) => {
                const spread = 128; // degrees covered by the arc
                const angle = -spread / 2 + (index * spread) / (SOCIAL_LINKS.length - 1);

                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-1/2 top-1/2 z-20 group"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(var(--r)) rotate(${-angle}deg)`,
                    }}
                    aria-label={label}
                  >
                    {/* Gentle float, staggered so the icons don't move in step */}
                    <span className="block animate-float" style={{ animationDelay: `${index * -0.8}s` }}>
                      <span
                        style={{ animationDelay: `${300 + index * 90}ms`, animationFillMode: "backwards" }}
                        className={`animate-in zoom-in-50 fade-in duration-500 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-background/80 backdrop-blur-sm border-2 border-blue-400/30 rounded-full text-xl text-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-white shadow-lg hover:shadow-xl ${HOVER[label] ?? ""}`}
                      >
                        <Icon className="size-4 lg:size-5" />
                      </span>
                    </span>
                  </a>
                );
              })}

              {/* Gradient Orbits */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/10 animate-pulse-slow" />
              <div
                className="absolute inset-4 rounded-full border-2 border-purple-400/10 animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              />

              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-4 shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 z-10" />
                  {/* Fills the circle; slight side crop, positioned to keep me and both screens */}
                  <Image
                    quality={90}
                    src="/hero.jpg"
                    alt="Mohammad Al Asad at his desk"
                    fill
                    // The 4:3 photo is drawn 4/3 wider than the circle to fill it
                    // (288px / 320px / 384px circle -> up to 427px / 512px wide), so request that width
                    sizes="(max-width: 1024px) 427px, 512px"
                    className="object-cover object-[45%_50%]"
                    priority
                  />
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
