"use client";

import React, { useEffect, useState } from "react";

// pill: on small screens the header shrinks to a centred floating pill (public pages)
function PageHeader({
  children,
  pill = false,
}: {
  children: React.ReactElement;
  pill?: boolean;
}) {
  // Only the scroll position needs JS; screen width is handled with CSS
  const [scrolled, setScrolled] = useState(false);
  // Pill mode on small screens: hide while scrolling down, show again on scroll up
  const [tucked, setTucked] = useState(false);
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 100);
      if (Math.abs(y - lastY) > 6) {
        setTucked(y > lastY && y > 80);
        lastY = y;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:mb-10 mb-8 z-20 fixed left-0 top-0 bg-background shadow dark:shadow-blue-600 transition-all duration-300 w-full ${
        scrolled ? "" : "md:pt-24"
      } ${pill ? "max-md:pt-3 max-md:bg-transparent max-md:shadow-none max-md:pointer-events-none" : ""} ${
        pill && tucked ? "max-md:-translate-y-[150%] max-md:opacity-0" : ""
      }`}
    >
      {children}
    </div>
  );
}

export default PageHeader;
