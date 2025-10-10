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
  const [isSide, setIsSide] = useState(false);
  const pathname = usePathname();

  const isAdminPanel = pathname.startsWith("/admin");

  useEffect(() => {
    const handleResize = () => {
      // if screen width <= 768px => side mode
      if (window.innerWidth <= 768) {
        setIsSide(true);
      } else {
        setIsSide(false);
      }
    };

    const handleScroll = () => {
      // if user scrolls down at least 100px, side to top mode
      if (window.scrollY > 100) {
        setIsSide(true);
      } else if (window.innerWidth > 768) {
        setIsSide(false);
      }
    };

    // run once at start
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
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
    { name: "Contact", path: "/#contact", icon: <Mail size={18} /> },
  ];

  const adminNavItems = [
    { name: "Dashboard", path: "/admin", icon: <Settings size={18} /> },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <Briefcase size={18} />,
    },
    { name: "Messages", path: "/admin/messages", icon: <Mail size={18} /> },
  ];

  const items = isAdminPanel ? adminNavItems : navItems;

  return (
    <nav
      className={`fixed md:top-6 z-50 top-[10%] ${
        isSide ? "left-0 md:top-20" : "w-full"
      }`}
    >
      <div>
        <div
          className={`flex ${
            isSide
              ? "flex-col"
              : "h-fit w-full gap-5 justify-center items-center"
          }`}
        >
          {/* <Link
            href={isAdminPanel ? "/admin" : "/"}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-400/15 to-purple-600/15 backdrop-blur-2xl p-2 rounded-4xl"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">
              {isAdminPanel ? "Admin Panel" : "DevFolio"}
            </span>
          </Link> */}

          <div
            className={`${
              isSide ? "flex flex-col px-0 py-2" : "px-2 py-1"
            } transition-all duration-500 w-fit bg-gradient-to-r from-blue-400/15 to-purple-600/15 rounded-xl backdrop-blur-sm flex space-x-1`}
          >
            {items.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className={`flex items-center transition-all duration-300 gap-2 text-foreground rounded-xl ${
                  isSide ? "size-9" : ""
                }`}
              >
                <Link href={item.path}>
                  {item.icon}
                  {!isSide ? item.name : ""}
                </Link>
              </Button>
            ))}
          </div>

          <div
            className={`${
              isSide ? "flex-col gap-2 mt-2 py-2 items-center" : "gap-2"
            } flex`}
          >
            <ThemeToggle />
            <Button
              variant="outline"
              className={`${isSide ? "size-9" : ""}`}
              asChild
            >
              <Link href={isAdminPanel ? "/" : "/admin"}>
                {isAdminPanel ? (
                  <>
                    <Home size={16} className="mr-1" />
                    {!isSide ? "Portfolio" : ""}
                  </>
                ) : (
                  <>
                    <UserStar className="w-5 h-5" /> {!isSide ? "Admin" : ""}
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
