"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Briefcase,
  Mail,
  Settings,
  ChartNoAxesCombined,
  GraduationCap,
  UserStar,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";

const Navbar = () => {
  // Only the scroll position needs JS; screen width is handled with CSS
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAdminPanel = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    {
      name: "Skills",
      path: "/#skills",
      icon: <ChartNoAxesCombined size={18} />,
    },
    {
      name: "Qualifications",
      path: "/#qualifications",
      icon: <GraduationCap size={20} />,
    },
    { name: "Projects", path: "/#projects", icon: <Briefcase size={18} /> },
    { name: "Contact", path: "/#contact", icon: <Mail size={18} /> },
  ];

  const adminNavItems = [
    { name: "Dashboard", path: "/admin", icon: <Settings size={18} /> },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <Briefcase size={18} />,
    },
    {
      name: "Qualifications",
      path: "/admin/qualifications",
      icon: <GraduationCap size={18} />,
    },
    { name: "Messages", path: "/admin/messages", icon: <Mail size={18} /> },
  ];

  const items = isAdminPanel ? adminNavItems : navItems;

  // Compact (side) layout: always below md via CSS, and on any screen once
  // scrolled. Width is handled by CSS so the first paint already matches.
  const side = (compact: string, wide: string) =>
    scrolled ? compact : `${compact} ${wide}`;
  const label = scrolled ? "hidden" : "hidden md:inline";

  return (
    <nav
      className={`fixed md:top-6 z-50 top-[10%] ${
        // Desktop: full-width bar at top-6; it moves down only once compact on scroll
        scrolled ? "left-0 md:top-20" : "left-0 md:left-auto md:w-full"
      }`}
    >
      <div>
        <div
          className={`flex ${side(
            "flex-col",
            "md:flex-row md:h-fit md:w-full md:gap-5 md:justify-center md:items-center"
          )}`}
        >
          <div
            className={`${side(
              "flex-col px-0 py-2",
              "md:flex-row md:px-2 md:py-1"
            )} transition-all duration-500 w-fit bg-gradient-to-r from-blue-400/15 to-purple-600/15 rounded-xl backdrop-blur-sm flex space-x-1`}
          >
            {items.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className={`flex items-center transition-all duration-300 gap-2 text-foreground rounded-xl ${side(
                  "size-9",
                  "md:w-auto md:h-9"
                )}`}
              >
                <Link href={item.path} aria-label={item.name}>
                  {item.icon}
                  <span className={label}>{item.name}</span>
                </Link>
              </Button>
            ))}
          </div>

          <div
            className={`${side(
              "flex-col gap-2 mt-2 py-2 items-center",
              "md:flex-row md:mt-0 md:py-0"
            )} flex`}
          >
            <ThemeToggle />
            <Button
              variant="outline"
              className={side("size-9", "md:w-auto md:h-9")}
              asChild
            >
              <Link
                href={isAdminPanel ? "/" : "/admin"}
                aria-label={isAdminPanel ? "Portfolio" : "Admin"}
              >
                {isAdminPanel ? (
                  <>
                    <Home size={16} />
                    <span className={label}>Portfolio</span>
                  </>
                ) : (
                  <>
                    <UserStar className="w-5 h-5" />
                    <span className={label}>Admin</span>
                  </>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
