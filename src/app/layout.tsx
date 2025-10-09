import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SessionProvider } from "@/components/SessionProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFolio - Professional Portfolio",
  description: "A modern portfolio for creative professionals",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <ThemeProvider>
            <EdgeStoreProvider>
              <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark text-gray-900 dark:text-white">
                <Navbar />
                <main className="container mx-auto">{children}</main>
                <Toaster />
              </div>
            </EdgeStoreProvider>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
