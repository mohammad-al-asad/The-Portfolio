import React, { useEffect, useState } from "react";

function PageHeader({ children }: { children: React.ReactElement }) {
  const [isSide, setIsSide] = useState(false);
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
  return (
    <div
      className={`md:mb-10 mb-8 z-20 fixed left-0 top-0 bg-background shadow dark:shadow-blue-600 transition-all duration-300 w-full ${
        isSide ? "" : "pt-24"
      }`}
    >
      {children}
    </div>
  );
}

export default PageHeader;
