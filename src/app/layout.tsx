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
  title: "Mohammad Al Asad",
  description:
    "Full-stack developer specializing in building modern, responsive web applications with cutting-edge technologies.",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <ThemeProvider>
            <EdgeStoreProvider>
              <div className="min-h-screen text-gray-900 dark:text-white">
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
