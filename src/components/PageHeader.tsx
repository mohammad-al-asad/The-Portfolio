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
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:mb-10 mb-8 z-20 fixed left-0 top-0 bg-background shadow dark:shadow-blue-600 transition-all duration-300 w-full ${
        scrolled ? "" : "md:pt-24"
      } ${pill ? "max-md:pt-3 max-md:bg-transparent max-md:shadow-none max-md:pointer-events-none" : ""}`}
    >
      {children}
    </div>
  );
}

export default PageHeader;
