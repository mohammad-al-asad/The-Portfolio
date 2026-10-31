import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "@/components/SessionProvider";
import VisitTracker from "@/components/VisitTracker";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const description =
  "Full-stack & React Native developer building fast, polished apps for mobile and the web.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mohammad Al Asad",
  description,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Mohammad Al Asad",
    title: "Mohammad Al Asad | Full-stack & React Native Developer",
    description,
    images: [{ url: "/hero.jpg", alt: "Mohammad Al Asad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Al Asad | Full-stack & React Native Developer",
    description,
    images: ["/hero.jpg"],
  },
};

// The session is fetched in the browser (only the admin area needs it), so
// public pages stay static and are served straight from the cache
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className}`}>
        <SessionProvider>
          <ThemeProvider>
            <div className="min-h-screen text-gray-900 dark:text-white">
              <Navbar />
              <main className="container mx-auto">{children}</main>
              <Toaster />
              <VisitTracker />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
