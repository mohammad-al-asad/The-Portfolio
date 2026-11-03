import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import HeroOrbit from "@/components/HeroOrbit";

export default function Hero({ resumeUrl }: { resumeUrl?: string | null }) {
  return (
    <section className="pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Phones and tablets: heading, photo, description, buttons.
            Desktop: heading, description and buttons on the left, photo on the right. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[1fr_auto_auto_auto_1fr] items-center gap-x-8 gap-y-6 lg:gap-y-0">
          {/* Text: CSS fade starts on first paint (no JS wait) */}
          <div className="text-center lg:text-left order-1 lg:col-start-1 lg:row-start-2 lg:mb-6 animate-in fade-in duration-1000">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Crafting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Digital Experiences
              </span>{" "}
              That Inspire
            </h1>
          </div>

          <div className="text-center lg:text-left order-3 lg:col-start-1 lg:row-start-3 lg:mb-8 animate-in fade-in duration-1000">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Full-stack & React Native developer building fast, polished apps
              for mobile and the web, from the first idea to the store listing.
            </p>
          </div>

          <div className="order-4 lg:col-start-1 lg:row-start-4 animate-in fade-in duration-1000">
            <div className="flex flex-col justify-center lg:justify-start sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="text-lg shadow-lg hover:shadow-xl transition duration-300"
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
                  className="text-lg border-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                >
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download CV <Download className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Image Side. Vertical padding leaves room for the orbit, which reaches past the photo */}
          <div className="relative order-2 lg:col-start-2 lg:row-start-1 lg:row-span-5 flex justify-center py-12 lg:py-0 animate-in fade-in duration-1000">
            {/* --r: how far the icon arc sits from the photo's centre, leaving a clear gap from the frame.
                Phones: 224px photo, so the whole orbit fits a 360px-wide screen. */}
            <div className="relative w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 [--r:146px] sm:[--r:194px] lg:[--r:232px]">
              {/* Soft glow behind the whole frame: one radial gradient (already soft,
                  so no blur filter) that gently breathes in opacity */}
              <div
                aria-hidden
                className="hero-glow pointer-events-none absolute -inset-12 sm:-inset-20 -z-20 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),rgba(147,51,234,0.16)_55%,transparent)]"
              />

              {/* Orbit line, travelling light and social icons */}
              <HeroOrbit />

              {/* Two rings that pulse around the photo, one second apart */}
              <div className="hero-ring absolute inset-0 rounded-full border-2 border-blue-400/10" />
              <div
                className="hero-ring absolute inset-4 rounded-full border-2 border-purple-400/10"
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
                    // (224px / 320px / 384px circle -> up to 427px / 512px wide), so request that width
                    sizes="(max-width: 1024px) 427px, 512px"
                    className="object-cover object-[45%_50%]"
                    priority
                  />
                </div>
              </div>

              {/* Background glow right behind the photo, softening its frame. A radial
                  gradient is soft on its own, so no blur filter; it pulses in opacity only. */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),rgba(147,51,234,0.3)_65%,transparent)] animate-pulse motion-reduce:animate-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
