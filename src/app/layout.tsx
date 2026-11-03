import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
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

// The session is only loaded inside the admin area (see admin/layout), so
// public pages stay static and visitors never fetch it
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className}`}>
        <ThemeProvider>
          <div className="min-h-dvh text-gray-900 dark:text-white">
            <Navbar />
            <main className="page-container">{children}</main>
            <Toaster />
            <VisitTracker />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
