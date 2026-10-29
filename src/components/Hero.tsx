"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Hero() {
  const socialLinks = [
    {
      icon: <FaGithub size={24} />,
      href: "https://github.com/mohammad-al-asad",
      label: "GitHub",
      className:"group-hover:bg-gray-500 group-hover:border-gray-500"
    },
    {
      icon: <FaLinkedinIn size={24} />,
      href: "https://www.linkedin.com/in/mohammad-al-asad",
      className:"group-hover:border-blue-500 group-hover:bg-blue-500",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram size={24} />,
      href: "https://www.instagram.com/maasad11914",
      className:"group-hover:border-none hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600",
      label: "Instagram",
    },
    {
      icon: <FaFacebookF size={24} />,
      href: "https://www.facebook.com/maasad11914",
      className:"group-hover:border-blue-500 group-hover:bg-blue-500",
      label: "Facebook",
    },
    
    {
      icon: <FaXTwitter size={24} />,
      href: "https://x.com/maasad11914",
      className:"dark:group-hover:border-white hover:border-black group-hover:bg-black",
      label: "Twitter",
    }
  ];
  const [resumeUrl, setResumeUrl] = useState("");
  async function fetchResume() {
    const res = await fetch("/api/resume");
    const resume = await res.json();
    setResumeUrl(resume.resumeUrl);
  }
  useEffect(() => {
    fetchResume();
  }, []);

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
              Full-stack developer specializing in building modern, responsive
              web applications with cutting-edge technologies.
            </p>
            <div className="flex flex-col justify-center lg:justify-start sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/projects" className="flex items-center">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-1 items-center"
                >
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative order-2 flex justify-center animate-in fade-in duration-1000">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Floating Social Icons */}
              {socialLinks.map((social, index) => {
                const angle = (index * 360) / socialLinks.length;
                const radius = 175; // Distance from center
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute left-[56%] top-[56%] -translate-x-1/2 -translate-y-1/2 z-20 group"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    aria-label={social.label}
                  >
                    <div
                      className={`animate-in zoom-in-50 fade-in duration-500 w-14 h-14 flex items-center justify-center bg-background/80 backdrop-blur-sm border-2 border-blue-400/30 rounded-full text-xl text-foreground transition-all duration-500 group-hover:scale-110 group-hover:text-white  shadow-lg hover:shadow-xl ${social.className}`}
                    >
                      {social.icon}
                    </div>
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
                    src="/hero.webp"
                    alt="Mohammad Al Asad at his desk"
                    fill
                    sizes="(max-width: 1024px) 320px, 384px"
                    className="object-cover object-[45%_50%]"
                    priority
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce" />
                <div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                />
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
