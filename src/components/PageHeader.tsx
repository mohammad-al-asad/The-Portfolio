"use client";

import React, { useEffect, useState } from "react";

function PageHeader({ children }: { children: React.ReactElement }) {
  // Only the scroll position needs JS; screen width is handled with CSS
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:mb-10 mb-8 z-20 fixed left-0 top-0 bg-background shadow dark:bg-background/75 dark:backdrop-blur-xl dark:shadow-[0_10px_30px_-16px_oklch(0.6_0.22_290/0.7)] dark:border-b dark:border-white/[0.06] transition-all duration-300 w-full ${
        scrolled ? "" : "md:pt-24"
      }`}
    >
      {children}
    </div>
  );
}

export default PageHeader;
