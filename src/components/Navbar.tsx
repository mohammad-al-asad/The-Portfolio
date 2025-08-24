"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Briefcase,
  Mail,
  Settings,
  Lock,
  ChartNoAxesCombined,
  GraduationCap,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
// import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();

  //   const { data: session } = useSession();
  const session = true;

  const isAdminPanel = pathname.startsWith("/admin");

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
    <nav className="sticky top-0 z-50 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800 bg-white/80 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href={isAdminPanel ? "/admin" : "/"}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">
              {isAdminPanel ? "Admin Panel" : "DevFolio"}
            </span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {items.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                className="flex items-center gap-2 text-foreground"
              >
                <Link href={item.path}>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {session ? (
              <>
                <ThemeToggle />
                <Button variant="outline" asChild>
                  <Link href={isAdminPanel ? "/" : "/admin"}>
                    {isAdminPanel ? (
                      <>
                        <Home size={16} className="mr-1" /> Portfolio
                      </>
                    ) : (
                      <>
                        <Lock size={16} className="mr-1" /> Admin
                      </>
                    )}
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild variant="default">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
